<template>
  <div id="app">
    <div class="container" style="width:600px">
      <div style="margin: 20px">
        <h3>JSON Files Management System </h3>
      </div>

      <file-manager></file-manager>
    </div>
  </div>
</template>

<script>
import FileManager from "./components/FileManager";

export default {
  name: "App",
  components: {
    FileManager
  }
};
</script>
