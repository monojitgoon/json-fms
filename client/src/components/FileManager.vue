<template>
  <div>
    <div v-if="currentFile" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

    <label class="btn btn-default">
      <input type="file"  accept=".json"  ref="inputFileUpload" @change="selectFile" />
    </label>

    <button
      style="margin: 5px"
      class="btn btn-success"
      :disabled="!selectedFiles"
      @click="upload"
    >
      Upload
    </button>
    <button class="btn btn-info" :disabled="selectedFiles" @click="reset">
      Reset
    </button>
    <div class="alert alert-light" role="alert">{{ message }}</div>

    <div class="card">
      <div class="card-header">Status of Uploaded JSON Files</div>

      <table class="table-striped">
        <thead>
          <tr>
            <th scope="col">FileName</th>
            <th scope="col">Parsing Status</th>
            <th scope="col">Time of Upload</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, index) in fileInfos" :key="index">
            <td>{{ file.fileName }}</td>
            <td>
              <span v-if="file.isParsed == true">Done</span>
              <span v-else>Error</span>
            </td>
            <td>{{ file.timeOfUpload }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FileManagerService from "../services/FileManagerService";

export default {
  name: "file-manager",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.inputFileUpload.files;
    },

    upload() {
      this.progress = 0;

      this.currentFile = this.selectedFiles.item(0);
      FileManagerService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          return FileManagerService.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    },
    reset() {
      this.currentFile = undefined;
      this.selectedFiles = undefined;
      this.message = "";
      this.$refs.inputFileUpload.value=null;

    },
  },
  mounted() {
    FileManagerService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  },
};
</script>
