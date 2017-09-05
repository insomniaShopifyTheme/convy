/*
{% capture CFH %}{{ content_for_header  }}{% endcapture %}

*/

theme.check_interval = false;
theme.wrn = function() {
  swal({
    title: "License not activated",
    html: "Sorry, we could not verify your license. Go to <strong>Customize theme</strong> &gt; <strong>General Settings</strong> &gt; <strong>License</strong> and paste your license key from the license.txt file.  If you don’t have a license, puchase one at <a href='https://www.konversiontheme.com' target='_blank'>www.konversiontheme.com</a>. <br> <span id='swal_mes'></span>",
    type: "error",
    confirmButtonText: "Continue anyway",
    showLoaderOnConfirm: true,
    confirmButtonColor: "#AAAAAA",
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showCancelButton: true,
    cancelButtonText: 'Activate my license',
    cancelButtonColor: "#0ECD69",
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
  }).then(null, function (dismiss) {
    if (dismiss === 'cancel') {
      window.open('https://desk.zoho.com/portal/tabarnapp/kb/articles/how-to-activate-your-license', '_blank');
      theme.wrn();
    }
  });
}
theme.check_license = function() {
  if (parseInt(localStorage.getItem("{{ settings.license_key | remove: ' ' | strip_newlines | sha1 }}") || -1) <= 0) {
    theme.wrn();
  }
}


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
      theme.check_license();
    });
  }
}

if (window.top.location !== window.location) {
  theme.setup_license();
}