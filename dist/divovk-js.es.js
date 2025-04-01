var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class DivoVK {
  constructor(options) {
    __publicField(this, "urlBlock", false);
    __publicField(this, "curState", { "activity": [] });
    __publicField(this, "curActive", "");
    __publicField(this, "cht", 0);
    __publicField(this, "chtLimit", 500);
    __publicField(this, "toastTime", 0);
    __publicField(this, "animList", {});
    __publicField(this, "toastId", "#toast");
    __publicField(this, "toastClickE", "");
    __publicField(this, "closeEvents", {});
    __publicField(this, "addListen", () => {
      window.addEventListener("popstate", (e) => {
        let wlh = window.location.hash, cA = this.curState.activity, cAL = cA.length, eS = e.state, eSA = [];
        if (this.urlBlock) {
          if (wlh !== "#" + this.curActive) this.hB(1);
          return;
        }
        if (eS !== null) eSA = e.state.activity;
        let aF = "open";
        if (eS === null || eSA.length < cAL) {
          let lS = eS === null ? 0 : eSA.length, rL = cAL - lS;
          aF = "close";
          for (let i = 0; i < rL; i++) {
            let a_id = cA[cAL - (1 + i)], nF = this.qS("#" + a_id).dataset.type;
            this.animList[`${nF}_${aF}`](a_id, this.curState);
            if (this.closeEvents[a_id] !== void 0) {
              this.closeEvents[a_id](cA[cAL - 2 < 0 ? 0 : cAL - 2]);
            }
          }
          if (cAL - 2 < 0) {
            this.curActive = "";
          } else {
            this.curActive = cA[cAL - 2];
          }
        } else {
          let a_id2 = eSA[eSA.length - 1];
          if (this.qS("#" + a_id2).dataset.noforw === "on") {
            this.hB();
            return;
          }
          let nF2 = this.qS("#" + a_id2).dataset.type;
          this.animList[`${nF2}_${aF}`](a_id2, this.curState);
        }
        this.curState = eS === null ? { "activity": [] } : eS;
      });
    });
    __publicField(this, "navTo", (id) => {
      let nF = this.qS("#" + id).dataset.type;
      let nSt = this.cVar(this.curState);
      if (+nF === 4 && nSt.activity.length > 0) {
        nSt.activity.pop();
        nSt.activity.push(id);
        history.replaceState(nSt, null, `#${id}`);
      } else {
        nSt.activity.push(id);
        history.pushState(nSt, null, `#${id}`);
      }
      this.animList[`${nF}_open`](id, this.curState);
      this.curActive = id;
      this.curState = nSt;
    });
    __publicField(this, "toast", (type, msg, time = 5e3, bottom = 10) => {
      bottom = bottom === 1 ? 0 : bottom;
      let classToast = { "e": "terror", "s": "tsuc", "i": "tinfo", "d": "tdel" };
      let toast = this.qS(this.toastId);
      this.delClass(toast, toast.getAttribute("tt"));
      this.addClass(toast, classToast[type]);
      toast.setAttribute("tt", classToast[type]);
      toast.style.marginBottom = `${bottom}px`;
      this.qS(`${this.toastId} .toast_text`).textContent = msg;
      this.addClass(toast, "t_active");
      clearTimeout(this.toastTime);
      let clickToast = () => {
        clearTimeout(this.toastTime);
        this.delClass(toast, "t_active");
        removeEventListener("click", clickToast);
      };
      this.toastTime = setTimeout(() => {
        this.delClass(toast, "t_active");
        removeEventListener("click", clickToast);
      }, time);
      toast.addEventListener("click", clickToast);
    });
    //helpers util
    __publicField(this, "hB", (n = -1) => {
      history.go(n);
    });
    //History Back
    __publicField(this, "qS", (s) => {
      return document.querySelector(s) || document.createElement("d");
    });
    //querySelector
    __publicField(this, "qSS", (s) => {
      return document.querySelectorAll(s);
    });
    //querySelector
    __publicField(this, "addClass", (e, c) => {
      e.classList.add(c);
    });
    __publicField(this, "delClass", (e, c) => {
      e.classList.remove(c);
    });
    __publicField(this, "cVar", (v) => JSON.parse(JSON.stringify(v)));
    //copy variable
    __publicField(this, "dAlle", (s) => {
      let o = s instanceof Element ? s : this.qS(s), n = o.cloneNode(true);
      o.parentNode.replaceChild(n, o);
    });
    __publicField(this, "pTime", () => {
      if (this.cht < +Date.now()) {
        this.cht = +Date.now() + this.chtLimit;
        return true;
      }
      return false;
    });
    __publicField(this, "initFun", () => {
      Element.prototype.qS = function(nC) {
        return this.querySelector(nC) || document.createElement("d");
      };
      Element.prototype.addCl = function(nameClass) {
        this.classList.add(nameClass);
      };
      Element.prototype.delCl = function(nameClass) {
        this.classList.remove(nameClass);
      };
      Element.prototype.addClick = function(func) {
        this.addEventListener("click", func || (() => {
        }));
      };
      Element.prototype.addMouseUp = function(func) {
        this.addEventListener("mouseup", func || (() => {
        }));
      };
      Element.prototype.addMouseDown = function(func) {
        this.addEventListener("mousedown", func || (() => {
        }));
      };
      NodeList.prototype.addClick = function(func) {
        this.forEach((e) => {
          e.addEventListener("click", () => {
            func(e);
          });
        });
      };
      NodeList.prototype.addMouseUp = function(func) {
        this.forEach((e) => {
          e.addEventListener("mouseup", func || (() => {
          }));
        });
      };
      NodeList.prototype.addMouseDown = function(func) {
        this.forEach((e) => {
          e.addEventListener("mousedown", func || (() => {
          }));
        });
      };
      Element.prototype.addChange = function(func) {
        this.addEventListener("change", func || (() => {
        }));
      };
      NodeList.prototype.addChange = function(func) {
        this.forEach((e) => {
          e.addEventListener("change", func || (() => {
          }));
        });
      };
      Element.prototype.addInput = function(func) {
        this.addEventListener("input", func || function() {
        });
      };
    });
    options = options || {
      url_block: false,
      limit_run: 500,
      toast_id: "#toast"
    };
    this.chtLimit = options.limit_run;
    this.urlBlock = options.url_block;
    this.toastId = options.toast_id;
    this.addListen();
    this.initFun();
  }
}
export {
  DivoVK as default
};
