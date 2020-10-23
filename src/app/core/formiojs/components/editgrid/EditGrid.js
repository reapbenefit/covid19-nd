"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _NestedArrayComponent2 = _interopRequireDefault(require("../_classes/nestedarray/NestedArrayComponent"));

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

var _utils = require("../../utils/utils");

var _templates = _interopRequireDefault(require("./templates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EditGridComponent = /*#__PURE__*/function (_NestedArrayComponent) {
  _inherits(EditGridComponent, _NestedArrayComponent);

  var _super = _createSuper(EditGridComponent);

  _createClass(EditGridComponent, [{
    key: "defaultSchema",
    get: function get() {
      return EditGridComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "editgridKey",
    get: function get() {
      return "editgrid-".concat(this.key);
    }
  }, {
    key: "minLength",
    get: function get() {
      return _lodash.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      this._data = value;
      var data = this.dataValue;
      (this.editRows || []).forEach(function (row, index) {
        var rowData = data[index];
        row.data = rowData;
        row.components.forEach(function (component) {
          component.data = rowData;
        });
      });
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedArrayComponent2.default.schema.apply(_NestedArrayComponent2.default, [{
        type: 'editgrid',
        label: 'Edit Grid',
        key: 'editGrid',
        clearOnHide: true,
        input: true,
        tree: true,
        removeRow: 'Cancel',
        defaultOpen: false,
        openWhenEmpty: false,
        components: [],
        inlineEdit: false,
        templates: {
          header: EditGridComponent.defaultHeaderTemplate,
          row: EditGridComponent.defaultRowTemplate,
          footer: ''
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Edit Grid',
        icon: 'tasks',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#editgrid',
        weight: 30,
        schema: EditGridComponent.schema()
      };
    }
  }, {
    key: "defaultHeaderTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">{{ component.label }}</div>\n  {% }) %}\n</div>";
    }
  }, {
    key: "defaultRowTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">\n      {{ getView(component, row[component.key]) }}\n    </div>\n  {% }) %}\n  {% if (!instance.options.readOnly && !instance.originalComponent.disabled) { %}\n    <div class=\"col-sm-2\">\n      <div class=\"btn-group pull-right\">\n        <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n        {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n          <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n        {% } %}\n      </div>\n    </div>\n  {% } %}\n</div>";
    }
  }]);

  function EditGridComponent() {
    var _this;

    _classCallCheck(this, EditGridComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'editgrid'; // this.editRows = [];

    return _this;
  }

  _createClass(EditGridComponent, [{
    key: "hasAddButton",
    value: function hasAddButton() {
      var maxLength = _lodash.default.get(this.component, 'validate.maxLength');

      return !this.component.disableAddingRemovingRows && !this.options.readOnly && !this.disabled && this.fullMode && !this.options.preview && (!maxLength || this.editRows.length < maxLength);
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.options.readOnly && !this.disabled && this.fullMode && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.builderMode) {
        this.editRows = [];
        return _get(_getPrototypeOf(EditGridComponent.prototype), "init", this).call(this);
      }

      this.components = this.components || [];
      var dataValue = this.dataValue || [];
      var openWhenEmpty = !dataValue.length && this.component.openWhenEmpty;

      if (openWhenEmpty) {
        var dataObj = {};
        this.editRows = [{
          isOpen: true,
          data: dataObj,
          emptyOpen: true,
          components: this.createRowComponents(dataObj, 0)
        }];
      } else {
        this.editRows = dataValue.map(function (row, rowIndex) {
          return {
            isOpen: false,
            data: row,
            components: _this2.createRowComponents(row, rowIndex)
          };
        });
      }

      this.checkData();
    }
  }, {
    key: "render",
    value: function render(children) {
      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this);
      }

      var dataValue = this.dataValue || [];
      var headerTemplate = _utils.Evaluator.noeval ? _templates.default.header : _lodash.default.get(this.component, 'templates.header');
      return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this, children || this.renderTemplate('editgrid', {
        editgridKey: this.editgridKey,
        header: this.renderString(headerTemplate, {
          components: this.component.components,
          value: dataValue
        }),
        footer: this.renderString(_lodash.default.get(this.component, 'templates.footer'), {
          components: this.component.components,
          value: dataValue
        }),
        rows: this.editRows.map(this.renderRow.bind(this)),
        openRows: this.editRows.map(function (row) {
          return row.isOpen;
        }),
        errors: this.editRows.map(function (row) {
          return row.error;
        }),
        hasAddButton: this.hasAddButton(),
        hasRemoveButtons: this.hasRemoveButtons()
      }));
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs,
          _this3 = this;

      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "attach", this).call(this, element);
      }

      this.loadRefs(element, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-addRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-removeRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-saveRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-cancelRow"), 'multiple'), _defineProperty(_this$loadRefs, this.editgridKey, 'multiple'), _this$loadRefs));
      this.refs["".concat(this.editgridKey, "-addRow")].forEach(function (addButton) {
        _this3.addEventListener(addButton, 'click', _this3.addRow.bind(_this3));
      });
      var openRowCount = 0;
      this.refs[this.editgridKey].forEach(function (row, rowIndex) {
        if (_this3.editRows[rowIndex].isOpen) {
          _this3.attachComponents(row, _this3.editRows[rowIndex].components);

          _this3.addEventListener(_this3.refs["".concat(_this3.editgridKey, "-saveRow")][openRowCount], 'click', function () {
            return _this3.saveRow(rowIndex);
          });

          _this3.addEventListener(_this3.refs["".concat(_this3.editgridKey, "-cancelRow")][openRowCount], 'click', function () {
            return _this3.cancelRow(rowIndex);
          });

          openRowCount++;
        } else {
          // Attach edit and remove button events.
          [{
            class: 'removeRow',
            event: 'click',
            action: _this3.removeRow.bind(_this3, rowIndex)
          }, {
            class: 'editRow',
            event: 'click',
            action: _this3.editRow.bind(_this3, rowIndex)
          }].forEach(function (action) {
            var elements = row.getElementsByClassName(action.class);
            Array.prototype.forEach.call(elements, function (element) {
              _this3.addEventListener(element, action.event, action.action);
            });
          });
        }
      }); // Add open class to the element if any edit grid row is open

      if (openRowCount) {
        this.addClass(this.refs.component, "formio-component-".concat(this.component.type, "-row-open"));
      } else {
        this.removeClass(this.refs.component, "formio-component-".concat(this.component.type, "-row-open"));
      }

      return _get(_getPrototypeOf(EditGridComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "clearOnHide",
    value: function clearOnHide(show) {
      _get(_getPrototypeOf(EditGridComponent.prototype), "clearOnHide", this).call(this, show);

      if (this.component.clearOnHide && !this.visible) {
        if (!this.editRows) {
          return;
        }

        this.removeAllRows();
      }
    }
  }, {
    key: "renderRow",
    value: function renderRow(row, rowIndex) {
      var dataValue = this.dataValue || [];

      if (row.isOpen) {
        return this.renderComponents(row.components);
      } else {
        var flattenedComponents = this.flattenComponents(rowIndex);
        var rowTemplate = _utils.Evaluator.noeval ? _templates.default.row : _lodash.default.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);
        return this.renderString(rowTemplate, {
          row: dataValue[rowIndex] || {},
          data: this.data,
          rowIndex: rowIndex,
          components: this.component.components,
          flattenedComponents: flattenedComponents,
          getView: function getView(component, data) {
            var instance = flattenedComponents[component.key];
            var view = instance ? instance.getView(data) : '';

            if (instance && instance.widget && view !== '--- PROTECTED ---') {
              if (_lodash.default.isArray(view)) {
                view = view.map(function (value) {
                  return instance.widget.getValueAsString(value);
                });
              } else {
                view = instance.widget.getValueAsString(view);
              }
            }

            return view;
          }
        });
      }
    }
  }, {
    key: "checkData",
    value: function checkData(data, flags, row) {
      var _this4 = this;

      data = data || this.rootValue;
      flags = flags || {};
      row = row || this.data;

      _Component.default.prototype.checkData.call(this, data, flags, row);

      return this.editRows.reduce(function (valid, editRow) {
        return _this4.checkRow(data, editRow, flags, editRow.data) && valid;
      }, true);
    }
  }, {
    key: "checkRow",
    value: function checkRow(data, editRow, flags, row) {
      return _get(_getPrototypeOf(EditGridComponent.prototype), "checkData", this).call(this, data, flags, row, editRow.components);
    }
  }, {
    key: "everyComponent",
    value: function everyComponent(fn, rowIndex) {
      var components = this.getComponents(rowIndex);

      _lodash.default.each(components, function (component, index) {
        if (fn(component, components, index) === false) {
          return false;
        }

        if (typeof component.everyComponent === 'function') {
          if (component.everyComponent(fn) === false) {
            return false;
          }
        }
      });
    }
  }, {
    key: "flattenComponents",
    value: function flattenComponents(rowIndex) {
      var result = {};
      this.everyComponent(function (component) {
        result[component.key] = component;
      }, rowIndex);
      return result;
    }
  }, {
    key: "getComponents",
    value: function getComponents(rowIndex) {
      // Ensure editrows is set.
      this.editRows = this.editRows || [];
      return this.builderMode ? _get(_getPrototypeOf(EditGridComponent.prototype), "getComponents", this).call(this) : _lodash.default.isNumber(rowIndex) ? this.editRows[rowIndex].components || [] : this.editRows.reduce(function (result, row) {
        return result.concat(row.components || []);
      }, []);
    }
  }, {
    key: "destroyComponents",
    value: function destroyComponents(rowIndex) {
      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "destroyComponents", this).call(this);
      }

      var components = this.getComponents(rowIndex).slice();
      components.forEach(function (comp) {
        return comp.destroy();
      });
    }
  }, {
    key: "addRow",
    value: function addRow() {
      if (this.options.readOnly) {
        return;
      }

      var dataObj = {};
      this.editRows.push({
        components: [],
        isOpen: true,
        data: dataObj
      });

      if (this.component.inlineEdit) {
        this.dataValue.push(dataObj);
      }

      var rowIndex = this.editRows.length - 1;
      var editRow = this.editRows[rowIndex];
      this.emit('editGridAddRow', {
        component: this.component,
        row: editRow
      });
      editRow.components = this.createRowComponents(editRow.data, rowIndex);
      this.checkRow(null, editRow, {}, editRow.data);

      if (this.component.modal) {
        this.addRowModal(rowIndex);
      } else {
        this.redraw();
      }

      return editRow;
    }
  }, {
    key: "addRowModal",
    value: function addRowModal(rowIndex) {
      var _this5 = this;

      var formComponents = this.ce('div');
      formComponents.innerHTML = this.renderComponents(this.editRows[rowIndex].components);
      var dialog = this.component.modal ? this.createModal(formComponents) : undefined;
      dialog.refs.dialogContents.appendChild(this.ce('button', {
        class: 'btn btn-primary',
        onClick: function onClick() {
          if (_this5.validateRow(_this5.editRows[rowIndex], true)) {
            dialog.close();

            _this5.saveRow(rowIndex);
          }
        }
      }, this.component.saveRow || 'Save'));
      this.attachComponents(formComponents, this.editRows[rowIndex].components);
    }
  }, {
    key: "setEditRowSettings",
    value: function setEditRowSettings(editRow) {
      editRow.dirty = false;
      editRow.isOpen = true;
      editRow.editing = true;
    }
  }, {
    key: "editRow",
    value: function editRow(rowIndex) {
      var dataValue = this.dataValue || [];
      var editRow = this.editRows[rowIndex];
      this.setEditRowSettings(editRow);
      editRow.data = dataValue[rowIndex] ? dataValue[rowIndex] : {};
      editRow.backup = dataValue[rowIndex] ? (0, _utils.fastCloneDeep)(dataValue[rowIndex]) : {};

      if (this.component.modal) {
        this.addRowModal(rowIndex);
      } else {
        this.redraw();
      }
    }
  }, {
    key: "clearErrors",
    value: function clearErrors(rowIndex) {
      var editRow = this.editRows[rowIndex];

      if (editRow && Array.isArray(editRow.components)) {
        editRow.components.forEach(function (comp) {
          comp.setPristine(true);
          comp.setCustomValidity('');
        });
      }
    }
  }, {
    key: "cancelRow",
    value: function cancelRow(rowIndex) {
      var editRow = this.editRows[rowIndex];

      if (this.options.readOnly) {
        editRow.dirty = false;
        editRow.isOpen = false;
        editRow.editing = false;
        this.redraw();
        return;
      }

      if (editRow.editing) {
        var dataValue = this.dataValue;
        editRow.dirty = false;
        editRow.isOpen = false;
        editRow.editing = false;
        dataValue[rowIndex] = editRow.data = editRow.backup;
        this.dataValue = dataValue;
        this.data = this._data;
        this.clearErrors(rowIndex);
      } else {
        this.clearErrors(rowIndex);
        this.destroyComponents(rowIndex);

        if (this.component.inlineEdit) {
          this.splice(rowIndex);
        }

        this.editRows.splice(rowIndex, 1);
      }

      this.checkValidity(null, true);
      this.redraw();
    }
  }, {
    key: "saveRow",
    value: function saveRow(rowIndex) {
      var editRow = this.editRows[rowIndex];

      if (this.options.readOnly) {
        editRow.dirty = false;
        editRow.isOpen = false;
        this.redraw();
        return;
      }

      editRow.dirty = true;

      if (!!this.validateRow(editRow, true) !== true) {
        return false;
      }

      if (!this.component.inlineEdit) {
        var dataValue = this.dataValue || [];

        if (editRow.editing) {
          dataValue[rowIndex] = editRow.data;
        } else {
          var newIndex = dataValue.length;
          dataValue.push(editRow.data);
          this.editRows.splice(rowIndex, 1);
          this.editRows.splice(newIndex, 0, editRow);
          rowIndex = newIndex;
        }
      }

      editRow.dirty = false;
      editRow.isOpen = false;
      editRow.editing = false;
      this.updateValue();
      this.triggerChange();
      this.checkValidity(null, true);
      this.redraw();
      return true;
    }
  }, {
    key: "updateRowsComponents",
    value: function updateRowsComponents(rowIndex) {
      for (var i = rowIndex; i < this.editRows.length; i++) {
        this.updateComponentsRowIndex(this.editRows[i].components, i);
      }
    }
  }, {
    key: "removeRow",
    value: function removeRow(rowIndex) {
      if (this.options.readOnly) {
        return;
      }

      this.destroyComponents(rowIndex);
      this.splice(rowIndex);
      this.editRows.splice(rowIndex, 1);
      this.updateRowsComponents(rowIndex);
      this.updateValue();
      this.triggerChange();
      this.checkValidity(null, true);
      this.checkData();
      this.redraw();
    }
  }, {
    key: "removeAllRows",
    value: function removeAllRows() {
      if (this.options.readOnly) {
        return;
      }

      var editRows = this.editRows || [];
      var rowIndex = editRows.length - 1;

      for (var index = rowIndex; index >= 0; index--) {
        this.removeRow(index);
      }
    }
  }, {
    key: "updateComponentsRowIndex",
    value: function updateComponentsRowIndex(components, rowIndex) {
      components.forEach(function (component, colIndex) {
        component.rowIndex = rowIndex;
        component.row = "".concat(rowIndex, "-").concat(colIndex);
      });
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this6 = this;

      var components = [];
      this.component.components.map(function (col, colIndex) {
        var column = _lodash.default.clone(col);

        var options = _lodash.default.clone(_this6.options);

        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex, "-").concat(colIndex);

        options.onChange = function (flags, changed, modified) {
          if (_this6.component.inlineEdit && _this6.options.onChange) {
            _this6.options.onChange(flags, changed, modified);
          } else if (_this6.editRows[rowIndex]) {
            _this6.checkRow(null, _this6.editRows[rowIndex], {
              changed: changed
            }, _this6.editRows[rowIndex].data);
          }
        };

        var comp = _this6.createComponent(_lodash.default.assign({}, column, {
          row: options.row
        }), options, row);

        comp.rowIndex = rowIndex;

        if (comp.path && column.key) {
          comp.path = comp.path.replace(new RegExp("\\.".concat(column.key, "$")), "[".concat(rowIndex, "].").concat(column.key));
        }

        components.push(comp);
      });
      return components;
    }
  }, {
    key: "validateRow",
    value: function validateRow(editRow, dirty) {
      var valid = true;
      var isDirty = dirty || !!editRow.dirty;

      if (editRow.editing || isDirty) {
        editRow.components.forEach(function (comp) {
          comp.setPristine(!isDirty);
          valid &= comp.checkValidity(null, isDirty, editRow.data);
        });
      }

      if (this.component.validate && this.component.validate.row) {
        valid = this.evaluate(this.component.validate.row, {
          valid: valid,
          row: editRow.data
        }, 'valid', true);

        if (valid.toString() !== 'true') {
          editRow.error = valid;
          valid = false;
        } else {
          delete editRow.error;
        }

        if (valid === null) {
          valid = "Invalid row validation for ".concat(this.key);
        }
      }

      return !!valid;
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, row) {
      data = data || this.rootValue;
      row = row || this.data;

      if (!this.checkCondition(row, data)) {
        this.setCustomValidity('');
        return true;
      }

      return this.checkComponentValidity(data, dirty, row);
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, row) {
      var _this7 = this;

      if (!_get(_getPrototypeOf(EditGridComponent.prototype), "checkComponentValidity", this).call(this, data, dirty, row)) {
        return false;
      }

      var rowsValid = true;
      var rowsEditing = false;
      this.editRows.forEach(function (editRow) {
        // Trigger all errors on the row.
        var rowValid = _this7.validateRow(editRow, dirty);

        rowsValid &= rowValid; // If this is a dirty check, and any rows are still editing, we need to throw validation error.

        rowsEditing |= dirty && (editRow.editing || editRow.isOpen);
      });

      if (!rowsValid) {
        this.setCustomValidity('Please correct rows before proceeding.', dirty);
        return false;
      } else if (rowsEditing && !this.component.inlineEdit) {
        this.setCustomValidity('Please save all rows before proceeding.', dirty);
        return false;
      }

      var message = this.invalid || this.invalidMessage(data, dirty);
      this.setCustomValidity(message, dirty);
      return true;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this8 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if ((0, _fastDeepEqual.default)(this.defaultValue, value)) {
        return false;
      }

      if (!value) {
        this.dataValue = this.defaultValue;
        return false;
      }

      if (!Array.isArray(value)) {
        if (_typeof(value) === 'object') {
          value = [value];
        } else {
          return false;
        }
      }

      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value; // Refresh editRow data when data changes.

      this.dataValue.forEach(function (row, rowIndex) {
        var editRow = _this8.editRows[rowIndex];

        if (editRow) {
          editRow.data = row;

          if (editRow.isOpen || changed) {
            if (editRow.emptyOpen) {
              editRow.isOpen = false;
            } else {
              editRow.components.forEach(function (col) {
                col.rowIndex = rowIndex;

                _this8.setNestedValue(col, row, flags);
              });
            }
          }
        } else {
          _this8.editRows[rowIndex] = {
            components: _this8.createRowComponents(row, rowIndex),
            isOpen: false,
            data: row
          };

          _this8.checkRow(null, _this8.editRows[rowIndex], {}, _this8.editRows[rowIndex].data);
        }
      });
      this.updateOnChange(flags, changed);

      if (changed) {
        this.rebuild();
      }

      return changed;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(EditGridComponent.prototype), "defaultValue", this);

      var defaultValue = Array.isArray(value) ? value : [];

      for (var dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
        defaultValue.push({});
      }

      return defaultValue;
    }
  }]);

  return EditGridComponent;
}(_NestedArrayComponent2.default);

exports.default = EditGridComponent;
EditGridComponent.prototype.hasChanged = _Component.default.prototype.hasChanged;