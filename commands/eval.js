const Discord = require("discord.js");

exports.run = async (bot, msg, args) => {
  var code = args.join(" ");
  try {
      var evaled = eval(code);
      if (evaled && evaled.constructor.name == 'Promise')
        evaled = await evaled;
      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);
      msg.channel.send(`\`\`\`xl\n${clean(bot, evaled)}\n\`\`\``
      );        
  }
  catch(err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(bot, err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'eval',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [...code]'
};


function clean(bot, text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(bot.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
  }
  else {
      return text;
  }
}