export const handleProgressBar = {
  fill(progressBar, width) {
    if (progressBar.width > width() - 20) {
      progressBar.width = width() - 10;
      progressBar.userAction = "unfill";
      return;
    }

    progressBar.width += 10;
  },
  unfill(progressBar, width) {
    if (progressBar.width <= 15) {
      progressBar.width = 5;
      progressBar.userAction = "fill";
      return;
    }

    progressBar.width -= 10;
  }
};
