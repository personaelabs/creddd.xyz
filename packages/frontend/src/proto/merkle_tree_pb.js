// source: merkle_tree.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = function () {
  return this || window || global || self || Function('return this')();
}.call(null);

goog.exportSymbol('proto.merkle_tree_proto.MerkleTree', null, global);
goog.exportSymbol('proto.merkle_tree_proto.MerkleTreeLayer', null, global);
goog.exportSymbol('proto.merkle_tree_proto.MerkleTreeNode', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.merkle_tree_proto.MerkleTreeNode = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.merkle_tree_proto.MerkleTreeNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.merkle_tree_proto.MerkleTreeNode.displayName =
    'proto.merkle_tree_proto.MerkleTreeNode';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.merkle_tree_proto.MerkleTreeLayer = function (opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.merkle_tree_proto.MerkleTreeLayer.repeatedFields_,
    null
  );
};
goog.inherits(proto.merkle_tree_proto.MerkleTreeLayer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.merkle_tree_proto.MerkleTreeLayer.displayName =
    'proto.merkle_tree_proto.MerkleTreeLayer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.merkle_tree_proto.MerkleTree = function (opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.merkle_tree_proto.MerkleTree.repeatedFields_,
    null
  );
};
goog.inherits(proto.merkle_tree_proto.MerkleTree, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.merkle_tree_proto.MerkleTree.displayName =
    'proto.merkle_tree_proto.MerkleTree';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.merkle_tree_proto.MerkleTreeNode.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.merkle_tree_proto.MerkleTreeNode.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.merkle_tree_proto.MerkleTreeNode} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.merkle_tree_proto.MerkleTreeNode.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        node: msg.getNode_asB64(),
        index: jspb.Message.getFieldWithDefault(msg, 2, 0),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.merkle_tree_proto.MerkleTreeNode}
 */
proto.merkle_tree_proto.MerkleTreeNode.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.merkle_tree_proto.MerkleTreeNode();
  return proto.merkle_tree_proto.MerkleTreeNode.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.merkle_tree_proto.MerkleTreeNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.merkle_tree_proto.MerkleTreeNode}
 */
proto.merkle_tree_proto.MerkleTreeNode.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!Uint8Array} */ (reader.readBytes());
        msg.setNode(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setIndex(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.merkle_tree_proto.MerkleTreeNode.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.merkle_tree_proto.MerkleTreeNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.merkle_tree_proto.MerkleTreeNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.merkle_tree_proto.MerkleTreeNode.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getNode_asU8();
  if (f.length > 0) {
    writer.writeBytes(1, f);
  }
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(2, f);
  }
};

/**
 * optional bytes node = 1;
 * @return {!(string|Uint8Array)}
 */
proto.merkle_tree_proto.MerkleTreeNode.prototype.getNode = function () {
  return /** @type {!(string|Uint8Array)} */ (
    jspb.Message.getFieldWithDefault(this, 1, '')
  );
};

/**
 * optional bytes node = 1;
 * This is a type-conversion wrapper around `getNode()`
 * @return {string}
 */
proto.merkle_tree_proto.MerkleTreeNode.prototype.getNode_asB64 = function () {
  return /** @type {string} */ (jspb.Message.bytesAsB64(this.getNode()));
};

/**
 * optional bytes node = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getNode()`
 * @return {!Uint8Array}
 */
proto.merkle_tree_proto.MerkleTreeNode.prototype.getNode_asU8 = function () {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getNode()));
};

/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.merkle_tree_proto.MerkleTreeNode} returns this
 */
proto.merkle_tree_proto.MerkleTreeNode.prototype.setNode = function (value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};

/**
 * optional uint32 index = 2;
 * @return {number}
 */
proto.merkle_tree_proto.MerkleTreeNode.prototype.getIndex = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.merkle_tree_proto.MerkleTreeNode} returns this
 */
proto.merkle_tree_proto.MerkleTreeNode.prototype.setIndex = function (value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.merkle_tree_proto.MerkleTreeLayer.repeatedFields_ = [1];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.merkle_tree_proto.MerkleTreeLayer.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.merkle_tree_proto.MerkleTreeLayer.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.merkle_tree_proto.MerkleTreeLayer} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.merkle_tree_proto.MerkleTreeLayer.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        nodesList: jspb.Message.toObjectList(
          msg.getNodesList(),
          proto.merkle_tree_proto.MerkleTreeNode.toObject,
          includeInstance
        ),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.merkle_tree_proto.MerkleTreeLayer}
 */
proto.merkle_tree_proto.MerkleTreeLayer.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.merkle_tree_proto.MerkleTreeLayer();
  return proto.merkle_tree_proto.MerkleTreeLayer.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.merkle_tree_proto.MerkleTreeLayer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.merkle_tree_proto.MerkleTreeLayer}
 */
proto.merkle_tree_proto.MerkleTreeLayer.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.merkle_tree_proto.MerkleTreeNode();
        reader.readMessage(
          value,
          proto.merkle_tree_proto.MerkleTreeNode.deserializeBinaryFromReader
        );
        msg.addNodes(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.merkle_tree_proto.MerkleTreeLayer.prototype.serializeBinary =
  function () {
    var writer = new jspb.BinaryWriter();
    proto.merkle_tree_proto.MerkleTreeLayer.serializeBinaryToWriter(
      this,
      writer
    );
    return writer.getResultBuffer();
  };

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.merkle_tree_proto.MerkleTreeLayer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.merkle_tree_proto.MerkleTreeLayer.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getNodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.merkle_tree_proto.MerkleTreeNode.serializeBinaryToWriter
    );
  }
};

/**
 * repeated MerkleTreeNode nodes = 1;
 * @return {!Array<!proto.merkle_tree_proto.MerkleTreeNode>}
 */
proto.merkle_tree_proto.MerkleTreeLayer.prototype.getNodesList = function () {
  return /** @type{!Array<!proto.merkle_tree_proto.MerkleTreeNode>} */ (
    jspb.Message.getRepeatedWrapperField(
      this,
      proto.merkle_tree_proto.MerkleTreeNode,
      1
    )
  );
};

/**
 * @param {!Array<!proto.merkle_tree_proto.MerkleTreeNode>} value
 * @return {!proto.merkle_tree_proto.MerkleTreeLayer} returns this
 */
proto.merkle_tree_proto.MerkleTreeLayer.prototype.setNodesList = function (
  value
) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};

/**
 * @param {!proto.merkle_tree_proto.MerkleTreeNode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.merkle_tree_proto.MerkleTreeNode}
 */
proto.merkle_tree_proto.MerkleTreeLayer.prototype.addNodes = function (
  opt_value,
  opt_index
) {
  return jspb.Message.addToRepeatedWrapperField(
    this,
    1,
    opt_value,
    proto.merkle_tree_proto.MerkleTreeNode,
    opt_index
  );
};

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.merkle_tree_proto.MerkleTreeLayer} returns this
 */
proto.merkle_tree_proto.MerkleTreeLayer.prototype.clearNodesList = function () {
  return this.setNodesList([]);
};

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.merkle_tree_proto.MerkleTree.repeatedFields_ = [1];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.merkle_tree_proto.MerkleTree.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.merkle_tree_proto.MerkleTree.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.merkle_tree_proto.MerkleTree} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.merkle_tree_proto.MerkleTree.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        layersList: jspb.Message.toObjectList(
          msg.getLayersList(),
          proto.merkle_tree_proto.MerkleTreeLayer.toObject,
          includeInstance
        ),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.merkle_tree_proto.MerkleTree}
 */
proto.merkle_tree_proto.MerkleTree.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.merkle_tree_proto.MerkleTree();
  return proto.merkle_tree_proto.MerkleTree.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.merkle_tree_proto.MerkleTree} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.merkle_tree_proto.MerkleTree}
 */
proto.merkle_tree_proto.MerkleTree.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.merkle_tree_proto.MerkleTreeLayer();
        reader.readMessage(
          value,
          proto.merkle_tree_proto.MerkleTreeLayer.deserializeBinaryFromReader
        );
        msg.addLayers(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.merkle_tree_proto.MerkleTree.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.merkle_tree_proto.MerkleTree.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.merkle_tree_proto.MerkleTree} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.merkle_tree_proto.MerkleTree.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getLayersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.merkle_tree_proto.MerkleTreeLayer.serializeBinaryToWriter
    );
  }
};

/**
 * repeated MerkleTreeLayer layers = 1;
 * @return {!Array<!proto.merkle_tree_proto.MerkleTreeLayer>}
 */
proto.merkle_tree_proto.MerkleTree.prototype.getLayersList = function () {
  return /** @type{!Array<!proto.merkle_tree_proto.MerkleTreeLayer>} */ (
    jspb.Message.getRepeatedWrapperField(
      this,
      proto.merkle_tree_proto.MerkleTreeLayer,
      1
    )
  );
};

/**
 * @param {!Array<!proto.merkle_tree_proto.MerkleTreeLayer>} value
 * @return {!proto.merkle_tree_proto.MerkleTree} returns this
 */
proto.merkle_tree_proto.MerkleTree.prototype.setLayersList = function (value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};

/**
 * @param {!proto.merkle_tree_proto.MerkleTreeLayer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.merkle_tree_proto.MerkleTreeLayer}
 */
proto.merkle_tree_proto.MerkleTree.prototype.addLayers = function (
  opt_value,
  opt_index
) {
  return jspb.Message.addToRepeatedWrapperField(
    this,
    1,
    opt_value,
    proto.merkle_tree_proto.MerkleTreeLayer,
    opt_index
  );
};

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.merkle_tree_proto.MerkleTree} returns this
 */
proto.merkle_tree_proto.MerkleTree.prototype.clearLayersList = function () {
  return this.setLayersList([]);
};

goog.object.extend(exports, proto.merkle_tree_proto);
