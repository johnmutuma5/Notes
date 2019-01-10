// a function to notify when some envrironment variables are unset

export const checkEnv = (env) => {
  let undefinedVariables = [];
  for (let variable in env) {
    if (env[variable] === undefined)
      undefinedVariables.push(variable);
  }

  if (!undefinedVariables.length)
    return env

  console.error(`${undefinedVariables.join(', ')} not found in ENVIRONMENT VARIABLES`);
  process.exit(1);
}
