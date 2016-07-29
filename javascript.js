var accounts = ["freecodecamp", "ESL_SC2", "callofduty", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "OgamingSC2", "TR7K", "sheevergaming", "cretetion"];

function generateStreams() {
  function json(name, type) {
    var fullUrl = 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
    return fullUrl;
  }
  accounts.forEach(function(value, index, array) {
    var accountName = value;
    //var webLink = 'https://www.twitch.tv/' + value;
    $.getJSON(json(accountName, 'streams'), function(data) {
      var accountInfo, game;
      if (data.stream === undefined) {
        accountInfo = "closed_stream";
        game = "This account is closed.";
      } else if (data.stream === null) {
        accountInfo = "offline_stream";
        game = "This channel is offline at the moment.";
      } else {
        accountInfo = "online_stream";
        game = data.stream.game;
      }
      $.getJSON(json(accountName, 'channels'), function(data) {
        var logo, displayName, gameDetails = "",
          webLink = "";
        if (data.logo === null || data.logo === undefined) {
          logo = 'http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png';
        } else {
          logo = data.logo;
        }
        if (accountInfo === "online_stream") {
          gameDetails = ': ' + data.status;
        }
        if (data.display_name !== null && data.display_name !== undefined) {
          displayName = data.display_name;
        } else {
          displayName = accountName;
        }
        if (data.url !== null && data.url !== undefined) {
          webLink = '<a class="account_link" href="' + data.url + '" target="_blank">' + displayName + '</a>';
        } else {
          webLink = '<span class="offline_account">' + displayName + '</span>';
        }
        var html = '<div class="row"><div class="stream vertical-align ' + accountInfo + '"><div class="col-xs-2 col-sm-1 logodiv"><img class="logo" src="' + logo + '" /></div><div class="col-xs-10 col-sm-3 account">' + webLink + '</div><div class="col-xs-10 col-sm-8  game_details">' + game + '<span class="hidden-xs">' + gameDetails + '</span></div></div></div>';
        if (accountInfo === "online_stream") {
          $('.online').append(html);
        } else if (accountInfo === "offline_stream") {
          $('.offline').append(html);
        } else if (accountInfo === "closed_stream") {
          $('.closed').append(html);
        }
      });
    });
  });

}

$(document).ready(function() {
  generateStreams();
  $('.visi_button').click(function() {
    var visible = $(this).attr('id');
    if (visible === 'all_button') {
      $('.online_stream, .offline_stream, .closed_stream').removeClass('hidden');
    } else if (visible === 'online_button') {
      $('.online_stream').removeClass('hidden');
      $('.offline_stream, .closed_stream').addClass('hidden');
    } else if (visible === 'offline_button') {
      $('.offline_stream').removeClass('hidden');
      $('.online_stream, .closed_stream').addClass('hidden');
    } else if (visible === 'closed_button') {
      $('.closed_stream').removeClass('hidden');
      $('.online_stream, .offline_stream').addClass('hidden');
    }
  });
});
