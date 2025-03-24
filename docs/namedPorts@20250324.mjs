/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function openPort(targetPort, channelName) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const thisPort = configChanel.port1;
    worker.postMessage({
      name: "config",
      port: channel.port2,
    }, [ channel.port2 ]);
    thisPort.addEventListener("message", initializePort);
    function initializePort() {
      thisPort.removeEventListener("message", initializePort);
      if (evt.data === undefined) {
        reject(new Error("Attempt to open port \"" + channelName + "\" rejected."));
      }
      if (evt.data === null) {
        resolve(thisPort);
      }
    }
  });
}

const channels = new Map();

function addNamedChannel(channelName, handler, multiple) {
  const channel = channels.get(channelName);
  if (channel) throw new Error("Channel \"" + channelName + "\" already exists.");
  channels.set(channelName, {
    handler,
    multiple: !!multiple,
    ports: [],
  });
}
function removeNamedChannel(channelName) {
  const channel = channels.get(channelName);
  if (!channel) return;
  for (const port of channel.ports) {
    port.removeEventHandler("message", channel.handler);
    port.postMessage();
    port.close();
  }
  channels.delete(channelName);
}
self.addEventListener("message", (evt) => {
  if (typeof evt.data === "object" && evt.data !== null && typeof evt.data.name === "string" && evt.data.port instanceof MessagePort) {
    const channel = channels.get(evt.data.name);
    if (!channel || ((channel.ports.length > 0) && !channel.multiple)) {
      evt.data.port.postMessage();
      evt.data.port.close();
      return;
    }
    evt.data.port.addEventHandler("message", channel.handler);
    channel.ports.push(evt.data.port);
    evt.data.port.start();
  }
});
