module.exports = class HW {
  constructor() {}

  static getDefinitionFor(hw) {
    if (hw === 'obnizb1') {
      return require('./obnizb1.json');
    } else if (hw === 'esp32w') {
      return require('./esp32w.json');
    }
    return undefined;
  }
};
