/*
{% capture CFH %}{{ content_for_header  }}{% endcapture %}

*/

theme.setup_license = function() {
  var license_key = "{{ settings.license_key | remove: ' ' | strip_newlines | sha256 }}";
  var key = "{{ settings.license_key | remove: ' ' | strip_newlines | sha1 }}";
  if (license_key !== "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855") {
    $.getJSON("https://get.tabarnapp.com/cdn/cl.php?l=" + license_key, function(data) {
      if (data && data.status !== 0) {
        localStorage.setItem(key, data.status);
      } else {
        localStorage.setItem(key, 0);
      }
    });
  }
}

theme.check_interval = false;

theme.check_license = function() {
  if (parseInt(localStorage.getItem("{{ settings.license_key | remove: ' ' | strip_newlines | sha1 }}")) <= 0) {
    swal({
      title: "Invalid license!",
      html: "Your license is invalid. Please check if you inputed it correctly or purchase a valid license from <a href='https://www.konversiontheme.com' target='_blank'>www.konversiontheme.com</a>. <br> <span id='swal_mes'></span>",
      type: "error",
      confirmButtonText: "Continue anyway",
      showCancelButton: false,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#E35F52",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      preConfirm: function() {
        swal.disableButtons();
        return new Promise(function(resolve) {
          if (theme.check_interval !== false) { clearInterval(theme.check_interval); };
          var timer = 15;
          $("#swal_mes").text("Window will be ready in " + timer + " seconds.");
          theme.check_interval = setInterval(function() {
            if (timer <= 0) {
              clearInterval(theme.check_interval);
              resolve();
              return;
            } else {
              timer -= 1;
            }
            $("#swal_mes").text("Window will be ready in " + timer + " seconds.");

          }, 1000);
        })
      }
    });
  }
}


if (window.top.location !== window.location) {
  theme.setup_license();
  theme.check_license();
}