Node.prototype.toObject = function toObject() {
    let { nodeName, attributes, children, innerHTML } = this;
    let resultObj = { nodeName };
    if (attributes.length) {
        let attributeObj = {};
        Array.from(attributes).forEach((attr) => {
            let { name, value } = attr;
            if (value !== undefined) attributeObj[name] = value;
        });
        resultObj = { ...resultObj, ...attributeObj };
    } //usually, attributes are not duplicated
    if (children.length) {
        let childrenObj = {};
        Array.from(children).forEach((child) => {
            childrenObj[child.nodeName] = Array.isArray(childrenObj[child.nodeName])
                ? [...childrenObj[child.nodeName], child.toObject()]
                : [child.toObject()];
        }); //not useful if children nodeName matches attribute name
        resultObj = { ...resultObj, ...childrenObj };
    } else {
        resultObj = { ...resultObj, nodeValue: innerHTML };
    } //innerHTML as backup when there is descendant
    /* if (arrAttributes.length) {
        arrAttributes = arrAttributes.map((nodeAttribute) => {
            let { name, value } = nodeAttribute;
            return { name, value };
        });
        if (arrAttributes.length) resultObj.attributes = arrAttributes;
    }
    if (arrChildren.length) {
        arrChildren = node.getFamily();
        resultObj.children = arrChildren;
    } */
    return resultObj;
};

Node.prototype.getAttributeObj = function getAttributeObj() {
    let { attributes } = this;
    if (!attributes.length) return false;
    let attributeObj = {};
    Array.from(attributes).forEach((attr) => {
        let { name, value } = attr;
        if (value !== undefined) attributeObj[name] = value;
    });
    return attributeObj;
};
