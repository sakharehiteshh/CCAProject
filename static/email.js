var shown = false;
function showhideEmail(){
    if (shown){
      document.getElementById('email').innerHTML = "Show my email";
      shown = false;
    }else{
      var myemail = "<a href='mailto:gadhaven1"+ "@" + "udayton.edu'>gadhaven1" + "@" + "udayton.edu</a>";
      document.getElementById('email').innerHTML= myemail;
      shown = true;
    }
}