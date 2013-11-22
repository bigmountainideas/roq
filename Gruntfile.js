module.exports = function(grunt) {
  grunt.initConfig({
      // running `grunt less` will compile once
    less: {
      development: {
        options: {
          paths: ["./lib/chisel/client/css"],
          yuicompress: true
        },
        files: {
          "./lib/chisel/client/css/chisel.min.css"      : "./lib/chisel/client/less/chisel.less",
          "./lib/chisel/client/css/fontawesome.min.css" : "./lib/chisel/client/less/fontawesome/font-awesome.less",
          "./lib/chisel/client/css/bootstrap.min.css"   : "./lib/chisel/client/less/bootstrap/bootstrap.less"
        }
      }
    },
    // running `grunt watch` will watch for changes
    watch: {
      files: "./lib/chisel/client/less/*.less",
      tasks: ["less"]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
};