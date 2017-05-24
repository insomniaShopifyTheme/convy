/*******************************************************************************
    Deal of the day
  *****************************************************************************/
theme.dealOfTheDay = function() {

  {% if settings.deal_of_the_day_enabled %}

    var $dealOfTheDay = $('.content-deal-of-the-day');
    var $dealOfTheDayProduct = $('.deal-of-the-day-product');

    var api_endpoint = '{{ shop.url }}' +'/products.json';

    var currentDateHours = '{{ 'now' | date: "%Y-%m-%d-%H-%M-%S"}}';
    var s_currentDate = currentDateHours.split('-');
    var currentDate = s_currentDate[0]+'-'+s_currentDate[1]+'-'+s_currentDate[2];

    function getShopProductsByTag(tag, callback) {
      $.get(api_endpoint, {}, function (data) {
        var empty = true;
        $.each(data.products, function (index, value) {
          //console.log(value.tags);
          if(value.tags.indexOf(tag) != -1){
            empty = false;
            callback(value);
            return false;
          }
        });
        if(empty){
          callback(false);
        }
      });
    }
    function addProductToLocalStorage(callback) {
      var tag = 'deal-' + currentDate;
      //look for the first product with the tag deal-yyyy-mm-dd
      getShopProductsByTag(tag, function (product) {
        if(product){
          //console.log('Deal of the day: Product updated');
          //save in local storage or replace the current one
          localStorage.setItem("deal_of_the_day", JSON.stringify({product: product}));
          callback();

        }else{
          //console.log('Deal of the day: No product to add');
          localStorage.removeItem("deal_of_the_day");
        }
      });
    }
    function countDownTimer(fromDate, toDate){
      var timer;

      var slice_FromDate = fromDate.split('-');
      var slice_ToDate = toDate.split('-');

      var toDate = new Date(slice_ToDate[0], slice_ToDate[1], slice_ToDate[2], 23, 59, 59);
      var fromDate = new Date(slice_FromDate[0], slice_FromDate[1], slice_FromDate[2], slice_FromDate[3], slice_FromDate[4], slice_FromDate[5]);
      var difference = toDate.getTime() - fromDate.getTime();

      //console.log(toDate, fromDate);

      /* percent of chart */
      /* 86400000 : 1 day time stamp */
      var base = 86400000;
      var percent = 100 - difference / base * 100;
      //jQuery(".dealzone-piechart").attr("data-percent", percent);

      $dealOfTheDayProduct.find('.progress-bar > .bar').animate({width: percent + '%'});

      timer = setInterval(function() {

        timeBetweenDates(difference);

        difference -= 1000;
      }, 1000);

    }
    function timeBetweenDates(diff) {

      if (diff <= 0) {

        // Timer done
        clearInterval(timer);

      } else {

        var seconds = Math.floor(diff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        var remain_time = new Date(0, 0, 0, hours, minutes, seconds);
        var output_rtime = remain_time.toTimeString().split(' ')[0];

        /*jQuery(".dealzoneCounter").text(hours + ":" + minutes + ":" + seconds);*/
        $dealOfTheDay.find(".dealzoneCounter").text(output_rtime);
        $dealOfTheDayProduct.find(".countdown").text(output_rtime);


        /* percent of chart */
        /* 86400000 : 1 day time stamp */
        var base = 86400000;
        var percent = 100 - diff / base * 100;


        //jQuery('#dealzone_bar_product .barChart__barFill').attr("style", "width: " + percent + "%");

      }
    }
    function init() {
      localstorage_dotd = JSON.parse(localStorage.getItem("deal_of_the_day"));
      $dealOfTheDay.fadeIn();

      var current_product_id = $dealOfTheDayProduct.attr('product-id');

      if(parseInt(current_product_id) === localstorage_dotd.product.id){
        $dealOfTheDayProduct.fadeIn();
      }

      var compare_at = localstorage_dotd.product.variants[0].compare_at_price;
      var price = localstorage_dotd.product.variants[0].price;

      var discount_percentage = (price - compare_at) * 100 / compare_at;

      $dealOfTheDay.find('.discount-percentage').html(discount_percentage+'%');

      $dealOfTheDay.find('.compared_at').html('$'+compare_at);
      $dealOfTheDay.find('.price').html('$'+price);

      //get small image
      var image = localstorage_dotd.product.images[0].src.replace('.jpg', '_compact.jpg');

      $dealOfTheDay.find('.product-image').attr('src', image);
      $dealOfTheDay.find('.product-link').attr('href', window.location.origin+ '/products/'+ localstorage_dotd.product.handle);

      var dealDate = localstorage_dotd.product.tags[localstorage_dotd.product.tags.indexOf('deal-'+currentDate)].replace('deal-', '');
      countDownTimer(currentDateHours, dealDate);
    }



    //get object from local storage
    var localstorage_dotd = JSON.parse(localStorage.getItem("deal_of_the_day"));

    /**
     * If the shop today's date is different from the product deal
     * date fetch a new product and save it in the browser local storage
     *
     * This prevents excessive requests to the products
     */
    if(localstorage_dotd == null){
      addProductToLocalStorage(function () {
        init();
      });
    }else{
      if(localstorage_dotd.product.tags.indexOf('deal-'+currentDate) == -1){
        addProductToLocalStorage(function () {
          init();
        });
      }else{
        init();
      }
    }

    $dealOfTheDay.find('.product-link').click(function () {
      localStorage.removeItem("deal_of_the_day")
    });

  {% endif %}
}
