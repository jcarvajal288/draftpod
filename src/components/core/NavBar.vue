<template>
  <nav class="navbar navbar-dark navbar-expand-sm user-select-none">
    <router-link to="/" exact>
      <img 
        class="navbar-logo" 
        src="/images/logo.svg"
      >
    </router-link>
    <span class="navbar-brand">
      <router-link 
        class="text-light" 
        to="/" 
        exact
      >
        {{ site.title }}
      </router-link>
    </span>
    
    <slot>
      <span class="navbar-text">
        Draft and sealed simulator for MTG
      </span>
    </slot>

    <ul class="navbar-nav ml-auto">
      <router-link 
        tag="li" 
        class="nav-item" 
        active-class="active" 
        to="/" 
        exact
      >
        <a class="nav-link">
          Home
        </a>
      </router-link>
      <router-link 
        tag="li" 
        class="nav-item" 
        active-class="active" 
        to="/play/"
      >
        <a class="nav-link">
          Play
        </a>
      </router-link>
      <router-link 
        tag="li" 
        class="nav-item" 
        active-class="active" 
        to="/guide/"
      >
        <a class="nav-link">
          Guide
        </a>
      </router-link>
    
      <li class="nav-item">
        <a class="nav-link icon-link" :href="site.twitter">
          <TwitterIcon />
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link icon-link" :href="site.github">
          <img class="navbar-github-image" src="/images/github.png">
        </a>
      </li>
      
    </ul>
    
  </nav>
</template>

<script>

import TwitterIcon from "vue-material-design-icons/Twitter.vue"

import config from '@/config'

export default {
  name: 'NavBar',


  components: {
    TwitterIcon
  },

  data: function() {
    return {
      site: config.site
    }
  }
}
</script>

<style>

.navbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 37px;
  border: 0;
  padding: 5px;
  padding-right: 0;
  z-index: 1000;
  background-image: linear-gradient(#484e55, #3A3F44 60%, #313539);
  background-repeat: no-repeat;
  background-color: transparent;
}

.navbar .nav-link {
  padding-top: 0.4rem;
  padding-bottom: 0.5rem;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgba(255,255,255,0.7);
 
}
.navbar-dark .navbar-nav .nav-link:focus {
  color: rgba(255,255,255,0.7);
  background-image: none;
}

.navbar-dark .navbar-text {
  color: rgba(255,255,255,0.7);
}

.navbar .navbar-text sup {
  top: -.2em;
}

.navbar .navbar-text .simple-svg-wrapper svg>path {
  fill: rgba(255,255,255,0.7);
}


.navbar .nav-link.icon-link {
  padding-top: 0;
  padding-bottom: 0.2rem;
}

.navbar .navbar-brand {
  font-size: 1rem;
  font-weight: 400;
  padding-top: 0;
  padding-bottom: 0 ;
  padding-left: 0.3rem;
}

.navbar .navbar-brand a:hover {
  text-decoration: none;
  color: #fff;
}

.navbar .navbar-logo {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  height: 26px;
}

.navbar .navbar-nav .nav-link {
  padding-left: 14px;
  padding-right: 14px;
}

.navbar .navbar-nav .icon-link {
  padding-left: 10px;
  padding-right: 10px;
}

.navbar .twitter-icon svg {
  width: 18px;
  height: 18px;
}

.navbar .navbar-text {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 1em;
}

.navbar .nav-item .material-design-icon {
  font-size: 1.3rem;
  line-height: inherit;
}

.navbar .simple-svg-wrapper {
  display: inline-block;
}

.navbar .navbar-set-icon {
  padding-bottom: 6px;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}

.navbar .navbar-text .simple-svg-wrapper svg {
  height: 16px;
  width: auto;
}

.navbar .navbar-github-image {
  height: 15px;
  line-height: inherit;
  margin-top: 11px;
  margin-bottom: 7px;
  padding-left: 2px;
  padding-right: 2px;
}

</style>
