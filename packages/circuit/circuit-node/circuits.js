let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

let cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
/**
 */
module.exports.prepare = function () {
  wasm.prepare();
};

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * @param {Uint8Array} pub_input
 * @param {Uint8Array} priv_input
 * @returns {Uint8Array}
 */
module.exports.prove = function (pub_input, priv_input) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(pub_input, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(priv_input, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    wasm.prove(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v3 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1, 1);
    return v3;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
};

/**
 * @param {Uint8Array} proof_ser
 * @returns {boolean}
 */
module.exports.verify = function (proof_ser) {
  const ptr0 = passArray8ToWasm0(proof_ser, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.verify(ptr0, len0);
  return ret !== 0;
};

/**
 * @param {Uint8Array} s
 * @param {Uint8Array} r
 * @param {boolean} is_y_odd
 * @param {Uint8Array} msg_hash
 * @param {Uint8Array} merkle_siblings
 * @param {Uint8Array} merkle_indices
 * @param {Uint8Array} root
 * @param {Uint8Array} sign_in_sig
 * @returns {Uint8Array}
 */
module.exports.prove_membership = function (
  s,
  r,
  is_y_odd,
  msg_hash,
  merkle_siblings,
  merkle_indices,
  root,
  sign_in_sig
) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(s, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(r, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray8ToWasm0(msg_hash, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray8ToWasm0(merkle_siblings, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ptr4 = passArray8ToWasm0(merkle_indices, wasm.__wbindgen_malloc);
    const len4 = WASM_VECTOR_LEN;
    const ptr5 = passArray8ToWasm0(root, wasm.__wbindgen_malloc);
    const len5 = WASM_VECTOR_LEN;
    const ptr6 = passArray8ToWasm0(sign_in_sig, wasm.__wbindgen_malloc);
    const len6 = WASM_VECTOR_LEN;
    wasm.prove_membership(
      retptr,
      ptr0,
      len0,
      ptr1,
      len1,
      is_y_odd,
      ptr2,
      len2,
      ptr3,
      len3,
      ptr4,
      len4,
      ptr5,
      len5,
      ptr6,
      len6
    );
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v8 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1, 1);
    return v8;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
};

/**
 * @param {Uint8Array} creddd_proof
 * @returns {boolean}
 */
module.exports.verify_membership = function (creddd_proof) {
  const ptr0 = passArray8ToWasm0(creddd_proof, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.verify_membership(ptr0, len0);
  return ret !== 0;
};

/**
 * @param {Uint8Array} creddd_proof
 * @returns {Uint8Array}
 */
module.exports.get_merkle_root = function (creddd_proof) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(creddd_proof, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.get_merkle_root(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1, 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
};

/**
 * @param {Uint8Array} creddd_proof
 * @returns {Uint8Array}
 */
module.exports.get_msg_hash = function (creddd_proof) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(creddd_proof, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.get_msg_hash(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1, 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
};

/**
 * @param {Uint8Array} creddd_proof
 * @returns {Uint8Array}
 */
module.exports.get_sign_in_sig = function (creddd_proof) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(creddd_proof, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.get_sign_in_sig(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1, 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
};

/**
 * @param {Uint8Array} bytes
 * @param {bigint} bitmap_bits
 * @param {number} k_num
 * @param {Uint8Array} sip_keys_bytes
 * @param {Uint8Array} item
 * @returns {boolean}
 */
module.exports.bloom_check = function (
  bytes,
  bitmap_bits,
  k_num,
  sip_keys_bytes,
  item
) {
  const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passArray8ToWasm0(sip_keys_bytes, wasm.__wbindgen_malloc);
  const len1 = WASM_VECTOR_LEN;
  const ptr2 = passArray8ToWasm0(item, wasm.__wbindgen_malloc);
  const len2 = WASM_VECTOR_LEN;
  const ret = wasm.bloom_check(
    ptr0,
    len0,
    bitmap_bits,
    k_num,
    ptr1,
    len1,
    ptr2,
    len2
  );
  return ret !== 0;
};

function notDefined(what) {
  return () => {
    throw new Error(`${what} is not defined`);
  };
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString =
  typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
      }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length,
        };
      };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8Memory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0;
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}
/**
 */
module.exports.init_panic_hook = function () {
  wasm.init_panic_hook();
};

/**
 * @param {Uint8Array} leaf_bytes
 * @param {number} depth
 * @returns {string}
 */
module.exports.secp256k1_init_tree = function (leaf_bytes, depth) {
  let deferred2_0;
  let deferred2_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(leaf_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.secp256k1_init_tree(retptr, ptr0, len0, depth);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    deferred2_0 = r0;
    deferred2_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
};

/**
 * @param {Uint8Array} leaf_bytes
 * @returns {string}
 */
module.exports.secp256k1_create_proof = function (leaf_bytes) {
  let deferred2_0;
  let deferred2_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(leaf_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.secp256k1_create_proof(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    deferred2_0 = r0;
    deferred2_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
};

let cachedUint32Memory0 = null;

function getUint32Memory0() {
  if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
    cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32Memory0;
}

function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getUint32Memory0();
  const slice = mem.subarray(ptr / 4, ptr / 4 + len);
  const result = [];
  for (let i = 0; i < slice.length; i++) {
    result.push(takeObject(slice[i]));
  }
  return result;
}
/**
 * @param {Uint8Array} leaf_bytes
 * @param {number} depth
 * @returns {(string)[]}
 */
module.exports.secp256k1_get_proofs = function (leaf_bytes, depth) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(leaf_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.secp256k1_get_proofs(retptr, ptr0, len0, depth);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayJsValueFromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 4, 4);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
};

module.exports.__wbg_now_077e852c2458b4d1 =
  typeof Date.now == 'function' ? Date.now : notDefined('Date.now');

module.exports.__wbindgen_string_new = function (arg0, arg1) {
  const ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
};

module.exports.__wbindgen_object_drop_ref = function (arg0) {
  takeObject(arg0);
};

module.exports.__wbg_log_79d3c56888567995 = function (arg0) {
  console.log(getObject(arg0));
};

module.exports.__wbg_crypto_d05b68a3572bb8ca = function (arg0) {
  const ret = getObject(arg0).crypto;
  return addHeapObject(ret);
};

module.exports.__wbindgen_is_object = function (arg0) {
  const val = getObject(arg0);
  const ret = typeof val === 'object' && val !== null;
  return ret;
};

module.exports.__wbg_process_b02b3570280d0366 = function (arg0) {
  const ret = getObject(arg0).process;
  return addHeapObject(ret);
};

module.exports.__wbg_versions_c1cb42213cedf0f5 = function (arg0) {
  const ret = getObject(arg0).versions;
  return addHeapObject(ret);
};

module.exports.__wbg_node_43b1089f407e4ec2 = function (arg0) {
  const ret = getObject(arg0).node;
  return addHeapObject(ret);
};

module.exports.__wbindgen_is_string = function (arg0) {
  const ret = typeof getObject(arg0) === 'string';
  return ret;
};

module.exports.__wbg_msCrypto_10fc94afee92bd76 = function (arg0) {
  const ret = getObject(arg0).msCrypto;
  return addHeapObject(ret);
};

module.exports.__wbg_require_9a7e0f667ead4995 = function () {
  return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
  }, arguments);
};

module.exports.__wbindgen_is_function = function (arg0) {
  const ret = typeof getObject(arg0) === 'function';
  return ret;
};

module.exports.__wbg_randomFillSync_b70ccbdf4926a99d = function () {
  return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
  }, arguments);
};

module.exports.__wbg_getRandomValues_7e42b4fb8779dc6d = function () {
  return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
  }, arguments);
};

module.exports.__wbg_newnoargs_cfecb3965268594c = function (arg0, arg1) {
  const ret = new Function(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
};

module.exports.__wbg_call_3f093dd26d5569f8 = function () {
  return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
  }, arguments);
};

module.exports.__wbindgen_object_clone_ref = function (arg0) {
  const ret = getObject(arg0);
  return addHeapObject(ret);
};

module.exports.__wbg_self_05040bd9523805b9 = function () {
  return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
  }, arguments);
};

module.exports.__wbg_window_adc720039f2cb14f = function () {
  return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
  }, arguments);
};

module.exports.__wbg_globalThis_622105db80c1457d = function () {
  return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
  }, arguments);
};

module.exports.__wbg_global_f56b013ed9bcf359 = function () {
  return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
  }, arguments);
};

module.exports.__wbindgen_is_undefined = function (arg0) {
  const ret = getObject(arg0) === undefined;
  return ret;
};

module.exports.__wbg_call_67f2111acd2dfdb6 = function () {
  return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  }, arguments);
};

module.exports.__wbg_buffer_b914fb8b50ebbc3e = function (arg0) {
  const ret = getObject(arg0).buffer;
  return addHeapObject(ret);
};

module.exports.__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e = function (
  arg0,
  arg1,
  arg2
) {
  const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
};

module.exports.__wbg_new_b1f2d6842d615181 = function (arg0) {
  const ret = new Uint8Array(getObject(arg0));
  return addHeapObject(ret);
};

module.exports.__wbg_set_7d988c98e6ced92d = function (arg0, arg1, arg2) {
  getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_newwithlength_0d03cef43b68a530 = function (arg0) {
  const ret = new Uint8Array(arg0 >>> 0);
  return addHeapObject(ret);
};

module.exports.__wbg_subarray_adc418253d76e2f1 = function (arg0, arg1, arg2) {
  const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
};

module.exports.__wbindgen_throw = function (arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_memory = function () {
  const ret = wasm.memory;
  return addHeapObject(ret);
};

module.exports.__wbg_new_abda76e883ba8a5f = function () {
  const ret = new Error();
  return addHeapObject(ret);
};

module.exports.__wbg_stack_658279fe44541cf6 = function (arg0, arg1) {
  const ret = getObject(arg1).stack;
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  );
  const len1 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len1;
  getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_error_f851667af71bcfc6 = function (arg0, arg1) {
  let deferred0_0;
  let deferred0_1;
  try {
    deferred0_0 = arg0;
    deferred0_1 = arg1;
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
  }
};

const path = require('path').join(__dirname, 'circuits_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;
