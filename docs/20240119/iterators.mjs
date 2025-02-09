/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// %GeneratorFunction% from ECMAScript 27.3.1 (The GeneratorFunction Constructor)
// %GeneratorFunction.prototype% from ECMAScript 27.3.3 (The GeneratorFunction Prototype Object)
// %GeneratorFunction.prototype.prototype% from ECMAScript 27.5.1 (The Generator Prototype Object)
// %IteratorPrototype% from ECMAScript 27.1.2 (The Iterator Prototype Object)
export const GeneratorFunction = (function* () {}).constructor;
export const __GeneratorFunction__ = GeneratorFunction.prototype;
export const __Generator__ = __GeneratorFunction__.prototype;
export const __Iterator__ = Object.getPrototypeOf(__Generator__);

// %AsyncGeneratorFunction% from ECMAScript 27.4.1 (The AsyncGeneratorFunction Constructor)
// %AsyncGeneratorFunction.prototype% from ECMAScript 27.4.3 (The AsyncGeneratorFunction Prototype Object)
// %AsyncGeneratorFunction.prototype.prototype% from ECMAScript 27.6.1 (The AsyncGenerator Prototype Object)
// %AsyncIteratorPrototype% from ECMAScript 27.1.3 (The AsyncIterator Prototype Object)
export const AsyncGeneratorFunction = (async function* () {}).constructor;
export const __AsyncGeneratorFunction__ = AsyncGeneratorFunction.prototype;
export const __AsyncGenerator__ = __AsyncGeneratorFunction__.prototype;
export const __AsyncIterator__ = Object.getPrototypeOf(__AsyncGenerator__);

// Add Iterator Constructor
export function Iterator() {
}
Iterator.prototype = __Iterator__;
// Add AsyncIterator Constructor
export function AsyncIterator() {
}
AsyncIterator.prototype = __AsyncIterator__;
