// 是否全屏
import { defineStore } from "pinia";

export const FullScreenSetting = defineStore("full-screen", {
  state() {
    return {
      full: null as any,
      isFull: false as boolean,
    };
  },
  actions: {
    fullScreen() {
      this.full = document.fullscreenElement;
      if (!this.full) {
        this.isFull = true;
        document.documentElement.requestFullscreen();
      } else {
        this.isFull = false;
        document.exitFullscreen();
      }
    },
    requestFull(){
        this.isFull = true;
        document.documentElement.requestFullscreen();
    },
    exitFull(){
        this.isFull = false;
        document.exitFullscreen();
    },

    // f11
    keyDow(event: any){
        if(event.keyCode === 122){
            event.returnValue = false
            this.fullScreen()
        }
    }
  }
})
