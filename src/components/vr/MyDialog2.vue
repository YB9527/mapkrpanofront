<template>
  <div>
    <transition name="fade">
      <div class="dialog" v-show="show">
        <div class="dialog-head">
          <h3>{{title}}</h3>
          <span class="dialog-close" @click="close"><a class="delete is-medium"></a></span>
        </div>
        <slot></slot>
      </div>
    </transition>
    <div class="alpha" v-show="show"></div>
  </div>
</template>
<script>
  export default {
    name: 'mydialog2',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      close(){
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss" scoped>

  .label {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
  }
  .delete:before {
    height: 2px;
    width: 50%;
  }
  .delete:after {
    height: 50%;
    width: 2px;
  }
  .delete:before, .delete:after {
    background-color: white;
    content: "";
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform-origin: center center;
  }
  .delete {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: rgba(10, 10, 10, 0.2);
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 1rem;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: top;
    width: 20px;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
  }

  .dialog {
    background-color: #fff;
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 20%;
    transform: translate3d(-50%, 0, 0);
    transition: all .4s ease;
    height: auto;
  }

  .dialog-head {
    position: relative;
    height: 50px;
    background-color: #374D61;
    h3 {
      line-height: 50px;
      padding-left: 15px;
      color: #fff;
      font-size: 16px;
    }
  }

  .dialog-close {
    position: absolute;
    right: 10px;
    top: 12px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .alpha {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 998;
  }
</style>
