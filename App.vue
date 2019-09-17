<template>
  <div id="app">
    <div id="nav" class="navigation">
    <nav class="navbar navbar-expand-lg">
    <ul class="navbar-nav">
    <li>
      <router-link  class="nav-link" to="/">Home</router-link> 
    </li>
    <li>
      <button
      class="btn"
      @click="$modal.show('demo-login')">
      Sign Up
    </button>
    </li>
    <li>
      <router-link  class="nav-link" to="/about">About</router-link>
    </li>
    </ul>
    </nav>
    </div>
    <router-view transition="slide-left" class="application"/>
    <demo-login-modal/>
      <modals-container />
    
     
     <v-dialog
    @before-opened="dialogEvent('before-open')"
    @before-closed="dialogEvent('before-close')"
    @opened="dialogEvent('opened')"
    @closed="dialogEvent('closed')"/>
  </div>
  
</template>


<script>

import DemoLoginModal       from './components/DemoLoginModal.vue'

export default {
  name: 'app',
  components: {
    
    DemoLoginModal
    
  },
  data () {
    return {
      canBeShown: false
    }
  },
  created () {
    setInterval(() => {
      this.canBeShown = !this.canBeShown
    }, 5000)
  },
  methods: {
    conditionalShow () {
      this.$modal.show('conditional-modal', {
        show: this.canBeShown
      })
    }
  }
}
</script>
<style>
#app {
      background:  url(https://media1.giphy.com/media/xT1R9YPd10kvCkDGlW/giphy.gif?cid=790b76115ccc3c6d59644f662e2ff058&rid=giphy.gif) no-repeat center center fixed; 
  background-size: cover;
}
.application {
text-align: center; 
}
    .navigation {
        background-color :  rgb(41, 237, 204);
    }
    
    .nav-link {
        color: black;
    }
    
    li {
        border-bottom: 1px;
        border-bottom-color: black;
        border-bottom-style: solid;

        margin-right: 10px;
           
    }
    
</style>