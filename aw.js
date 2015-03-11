function getAjaxSubmitUrl() {
  var url = $("form#subscribe-form").attr("action");
  url = url.replace("/post?u=", "/post-json?u=");
  url += "&c=?";
  return url;
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

//{result: "error", msg: "micah@airworthy.co is already subscribed to list Airworthy Newsletter. <a href="http://airworthy.us10.list-manage.com/subscribe/send-email?u=4cc3eaaba999c1ae3aff5aa1e&id=3bf0070305&e=bWljYWhAYWlyd29ydGh5LmNv">Click here to update your profile.</a>"}
//{result: "success" msg: "Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you."}
function formSubmitted(resp) {
  console.log(resp);
  if("error" == resp.result) {
    $("form#subscribe-form").append("<p id=\"form-error\" class=\"error\">" + resp.msg + "</p>");
  }
  else {
    // On Successful Subscription
    $("form#subscribe-form").detach();
    $("#landing-container").append("<p>" + resp.msg + "</p>");
  }
}

function submitForm() {
  var options = {
    url: getAjaxSubmitUrl(),
    type: 'GET',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: formSubmitted
  };
  $("form#subscribe-form").ajaxSubmit(options);
}

function showInvalidForm() {
  $("#email-pocky").append("<div class=\"error\" id=\"email-error\">We need a valid email</div>");
}

$(document).ready(function () {
  $("form#subscribe-form").submit(function (event) {
    event.preventDefault();
    $("#email-error").detach();
    $("#form-error").detach();
    var email = $("#mce-EMAIL").val();
    if(isEmail(email))
      submitForm();
    else
      showInvalidForm();
  });
});