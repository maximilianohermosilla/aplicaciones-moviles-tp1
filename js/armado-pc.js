
$(document).ready(function()
{
    var pageOptions = {
        "pubId": "pub-1712551534278535", // Make sure this is the correct client ID
        "styleId": "1234567891", // Make sure this is the correct style id
        "query": "pc" // Make sure the correct query is placed here
      };
      var adblock1 = {
        "container": "afscontainer1",
      };
      var adblock2 = {
        "container": "afscontainer2",
      };
      _googCsa('ads', pageOptions, adblock1, adblock2);

    // $(".adsense-inject").each(function () {
    //     $(this).append('<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3978524526870979" data-ad-slot="6927511035" data-ad-format="auto"></ins>');
    //     (adsbygoogle = window.adsbygoogle || []).push({});
    // }); 
});