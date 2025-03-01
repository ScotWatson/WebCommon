/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export function gammaDecode(u) {
  return ( u <= 0.04045 ) ? ( u / 12.92 ) : Math.pow( ( ( u + 0.055 ) / 1.055 ), 2.4);
}

export function gammaEncode(v) {
  return ( v <= 0.0031308 ) ? ( 12.92 * v ) : 1.055 * Math.pow( v, 1 / 2.4) - 0.055;
}

export function createRGBBuffers(width, height) {
  return {
    R: new Float64Array(width * height),
    G: new Float64Array(width * height),
    B: new Float64Array(width * height),
    width,
    height,
  };
}

export function createXYZBuffers(width, height) {
  return {
    X: new Float64Array(width * height),
    Y: new Float64Array(width * height),
    Z: new Float64Array(width * height),
    width,
    height,
  };
}

export function getRGBFromImage(imageData, result) {
  for (let j = 0; j < imageData.height; ++j) {
    for (let i = 0; i < imageData.width; ++i) {
      const baseIndex = imageData.width * j + i;
      const r_gamma = imageData.data[4 * baseIndex] / 255;
      const g_gamma = imageData.data[4 * baseIndex + 1] / 255;
      const b_gamma = imageData.data[4 * baseIndex + 2] / 255;
      result.R[baseIndex] = gammaDecode(r_gamma);
      result.G[baseIndex] = gammaDecode(g_gamma);
      result.B[baseIndex] = gammaDecode(b_gamma);
    }
  }
}

export function getXYZFromRGB(rgb, result) {
  for (let i = 0; i < rgb.height * rgb.width; ++i) {
    result.X[i] = 0.4124 * rgb.R[i] + 0.3576 * rgb.G[i] + 0.1805 * rgb.B[i];
    result.Y[i] = 0.2126 * rgb.R[i] + 0.7152 * rgb.G[i] + 0.0722 * rgb.B[i];
    result.Z[i] = 0.0193 * rgb.R[i] + 0.1192 * rgb.G[i] + 0.9505 * rgb.B[i];
  }
}

export function getXYZFromImage(imageData, result) {
  for (let j = 0; j < imageData.height; ++j) {
    for (let i = 0; i < imageData.width; ++i) {
      const baseIndex = imageData.width * j + i;
      const r_gamma = imageData.data[4 * baseIndex] / 255;
      const g_gamma = imageData.data[4 * baseIndex + 1] / 255;
      const b_gamma = imageData.data[4 * baseIndex + 2] / 255;
      const r_linear = gammaDecode(r_gamma);
      const g_linear = gammaDecode(g_gamma);
      const b_linear = gammaDecode(b_gamma);
      result.X[baseIndex] = 0.4124 * r_linear + 0.3576 * g_linear + 0.1805 * b_linear;
      result.Y[baseIndex] = 0.2126 * r_linear + 0.7152 * g_linear + 0.0722 * b_linear;
      result.Z[baseIndex] = 0.0193 * r_linear + 0.1192 * g_linear + 0.9505 * b_linear;
    }
  }
}
