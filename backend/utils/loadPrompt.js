const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const yaml = require('yaml');

function loadPrompt(category = "self-worth") {
  const yamlPath = path.join(__dirname, '../prompt_templates/affirmation_prompt.yaml');
  const file = fs.readFileSync(yamlPath, 'utf8');
  const data = yaml.parse(file);

  // Use nunjucks to render the user prompt
  const renderedUserPrompt = nunjucks.renderString(data.user, { category });

  return {
    system: data.system,
    user: renderedUserPrompt
  };
}

module.exports = loadPrompt;
