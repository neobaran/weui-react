const gulp = require("gulp");
const typescript = require("gulp-typescript");

const tsProject = typescript.createProject("./tsconfig.json", {
  declaration: true,
});
const babel = require("gulp-babel");
const del = require("del");

const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task("clean", () => del(["./dist/**/*"]));

gulp.task("compileTs", () =>
  gulp.src(["./components/**/*.tsx"]).pipe(tsProject()).pipe(gulp.dest("dist"))
);

gulp.task("compileJs", () =>
  gulp
    .src(["./dist/**/*.jsx"])
    .pipe(
      babel({
        presets: ["@babel/preset-react"],
      })
    )
    .pipe(gulp.dest("dist"))
);

gulp.task("compileLess", () =>
  gulp
    .src(["./components/**/*.less"])
    .pipe(less())
    .pipe(postcss([autoprefixer(["iOS >= 7", "Android >= 4.1"])]))
    .pipe(gulp.dest("dist"))
);

gulp.task("watchTS", (cb) => {
  gulp.watch(["./components/**/*.tsx"], gulp.series("compileTs", "compileJs"));
  cb();
});

gulp.task("watchLess", (cb) => {
  gulp.watch(["./components/**/*.less"], gulp.series("compileLess"));
  cb();
});

gulp.task(
  "build",
  gulp.series("clean", "compileTs", "compileJs", "compileLess")
);

gulp.task(
  "default",
  gulp.series("build", gulp.parallel("watchLess", "watchTS"))
);
