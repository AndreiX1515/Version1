<!DOCTYPE html>

<?php include_once("../mobile/includes/themes-session.php"); ?>


<html lang="en" class="<?php echo $themeClass; ?>">

<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="../mobile/assets/css/root.css?v=<?= time(); ?>">
  <link rel="stylesheet" href="../mobile/assets/css/mobile.css?v=<?= time(); ?>">

</head>




<body>

  <div class="login-container">

    <header class="login-top-header">

      <div class="theme-toggle-container-login" data-theme-toggle>
        <span class="theme-label-text">Light</span>

        <button
          class="theme-toggle-btn"
          aria-label="Toggle theme"
          aria-pressed="false"
          type="button">
          <i class="fas fa-sun"></i>
          <span class="theme-toggle-thumb"></span>
        </button>
      </div>

    </header>

    
    <div class="login-wrapper">

      <div class="login-header">
        <div class="login-logo">
          <img src="../mobile/assets/images/logo.png" alt="App Logo">
        </div>

        <h1>Welcome Back</h1>
        <p>Sign in to continue</p>
      </div>

      <form class="login-form" action="dashboard.php" method="post">
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required>
        </div>

        <button class="btn-primary" type="submit">Login</button>

        <div class="login-footer">
          <span>Don’t have an account?</span>
          <a href="#">Register</a>
        </div>
      </form>

    </div>


  </div>

</body>



<script src="../mobile/js/theme-toggle.js"></script>


</html>