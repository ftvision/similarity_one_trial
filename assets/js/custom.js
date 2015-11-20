// opt-in fullpage.js
// $(document).ready(function() {
//     $('#fullpage').fullpage();
// });
// opt-in tooltip component in bootstrap
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// opt-in fullpage.js; Full initialization

$(document).ready(function() {
    var image1 = document.getElementById("first_image");
    var image2 = document.getElementById("second_image");
    var image3 = document.getElementById("third_image");
    var target = Math.floor((Math.random() * 24) + 1);

    //selectively increase the response for 1,11,23,3,15,9,21
    //while (target != 1 && target != 11 && target !=23 && target !=3 && target!=15 && target!=9 && target!=21){
    //    target = Math.floor((Math.random() * 24) + 1);
    //}
    
    if (target <= 12) {
        image1.src = 'assets/img/'+target.toString()+'-1.jpg';
        image2.src = 'assets/img/'+target.toString()+'-2.jpg';
        image3.src = 'assets/img/'+target.toString()+'-1.jpg';
    } else {
        target = target - 12;
        image1.src = 'assets/img/'+target.toString()+'-2.jpg';
        image2.src = 'assets/img/'+target.toString()+'-1.jpg';
        image3.src = 'assets/img/'+target.toString()+'-2.jpg';
    };
    //randomzie userID
    var charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var length = 8;
    var userID = '';
    for (var i = length; i > 0; --i) userID += charset[Math.round(Math.random() * (charset.length - 1))];
    var destination = document.getElementById("userID");
    destination.setAttribute("data", userID);

    $('#fullpage').fullpage({
        //Navigation
        menu: false,
        lockAnchors: false,
        anchors:['firstPage', 'secondPage', 'thirdPage'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: false,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: true,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#fff'],
        paddingTop: '0',
        paddingBottom: '70px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0, //1024 px,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
});
function sendMail(){
    var url1 = document.getElementById("first_image").src;
    var url2 = document.getElementById("second_image").src;
    var url3 = document.getElementById("third_image").src;
    var resp = $("input[name=likert]:checked").val();
    var userID = document.getElementById("userID").getAttribute("data");
    var text = "picture1:" + url1 + "<br/>" + "picture2:" + url2 + "<br/>" +
     "picture3:" + url3 + "<br />" + "response:" + resp.toString() + "<br/>" + "userID:" + userID;

    //generate random string
    var charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var length = 8;
    var result = '';
    for (var i = length; i > 0; --i) result += charset[Math.round(Math.random() * (charset.length - 1))];
    result = resp.toString() + '_' + result;
    var MTurk_Code = result;
     
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': 'AbBMyFhHFAtYTlPHyJ87xQ',
          'message': {
            'from_email': 'ftvision1121@gmail.com',
            'to': [
              {
                'email': 'ftvision1121@gmail.com',
                'name': 'Participant',
                'type': 'to'
              }
            ],
            'subject': 'Three Item Rating',
            'html': text
          }
        }
      });
    
    document.getElementById("mySubmit").disabled = true;


    $("#resp").html('System has successfully sent your response to us! Please do NOT submit again');
    $("#resp").removeClass("label-warning")
    $("#resp").addClass("label-success")

    $("#turk-code").html(MTurk_Code);
    $("#turk-code").removeClass("label-warning")
    $("#turk-code").addClass("label-success")


}   

