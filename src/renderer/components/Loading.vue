<template>
    <transition name="modal">
        <div class="modall-mask">
            <div class="modall-wrapper">
            <div class="modall-container">
                <div class="modall-body" style="background: transparent !important;">
                    <svg class="h-16 w-16 fill-current" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
<circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>
  <circle fill="#fff" stroke="#c5c5c5" stroke-width="3" cx="8" cy="54" r="6" >
    <animateTransform
      attributeName="transform"
      dur="1s"
      type="rotate"
      from="0 50 48"
      to="360 50 52"
      repeatCount="indefinite" />
    
  </circle>
</svg>
</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style>
.modall-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modall-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modall-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: transparent !important;
  border-radius: 10px;
  transition: all .3s ease;
  vertical-align: middle;
  text-align: center;
  text-align: -webkit-center;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modall-body {
  margin: 20px 0;
}
</style>
