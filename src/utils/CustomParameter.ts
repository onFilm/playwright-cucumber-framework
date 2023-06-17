import {defineParameterType} from "@cucumber/cucumber";

defineParameterType({
  name: "listOfString",
  regexp: "(?:[^,]*)(?:,\\s?[^,]*)*",
  transformer: s => s.split(",")
});