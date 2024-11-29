/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;

  this.getArea = () => this.width * this.height;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  return Object.setPrototypeOf(JSON.parse(json), proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  selectors: [],

  selectorsSpecificity: {
    element: 0,
    id: 1,
    class: 2,
    attr: 3,
    pseudoClass: 4,
    pseudoElement: 5,
    combinator: -1,
  },

  duplicationMap: {
    element: false,
    id: false,
    class: true,
    attr: true,
    pseudoClass: true,
    pseudoElement: false,
    combinator: true,
  },

  stringifySelector({ body, type }) {
    const selectorMap = {
      element: body,
      id: `#${body}`,
      class: `.${body}`,
      attr: `[${body}]`,
      pseudoClass: `:${body}`,
      pseudoElement: `::${body}`,
      combinator: body,
    };

    if (selectorMap[type] === undefined) {
      throw new Error('Wrong selector type.');
    }

    return selectorMap[type];
  },

  addSelector({ body, type }) {
    const newObj = { ...cssSelectorBuilder };

    newObj.selectors = [...this.selectors, { body, type }];

    const { isRightOrder, isWithoutChainDuplication } = newObj.validateSelectors();

    if (!isWithoutChainDuplication) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (!isRightOrder) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    return newObj;
  },

  validateSelectorsOrder() {
    const selectorsSpecificity = this.selectors.map(
      (selector) => this.selectorsSpecificity[selector.type],
    );

    const isRightOrder = selectorsSpecificity.every((specificity, index, array) => (
      (specificity === -1 || index === 0) ? true : specificity >= array[index - 1]
    ));

    return isRightOrder;
  },
  validateChainDuplication() {
    const isSelectorsValid = this.selectors.map((selector, index, selectorsArr) => {
      if (index === 0) {
        return true;
      }

      const canBeDuplicated = this.duplicationMap[selector.type];

      if (canBeDuplicated === undefined) {
        throw new Error('Wrong selector type.');
      }

      if (canBeDuplicated) {
        return true;
      }

      const isDuplicated = selector.type === selectorsArr[index - 1].type;

      return !isDuplicated;
    }).every((isValid) => isValid);

    return isSelectorsValid;
  },
  validateSelectors() {
    const isRightOrder = this.validateSelectorsOrder();
    const isWithoutChainDuplication = this.validateChainDuplication();

    return {
      isRightOrder,
      isWithoutChainDuplication,
    };
  },

  stringify() {
    const selectorsStr = this.selectors.reduce((acc, curr) => acc + this.stringifySelector(curr), '');

    return selectorsStr;
  },

  element(value) {
    return this.addSelector({ body: value, type: 'element' });
  },
  id(value) {
    return this.addSelector({ body: value, type: 'id' });
  },
  class(value) {
    return this.addSelector({ body: value, type: 'class' });
  },
  attr(value) {
    return this.addSelector({ body: value, type: 'attr' });
  },
  pseudoClass(value) {
    return this.addSelector({ body: value, type: 'pseudoClass' });
  },
  pseudoElement(value) {
    return this.addSelector({ body: value, type: 'pseudoElement' });
  },

  combine(selector1, combinator, selector2) {
    const newObj = { ...cssSelectorBuilder };
    newObj.selectors = [...selector1.selectors, { body: ` ${combinator} `, type: 'combinator' }, ...selector2.selectors];

    return newObj;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
