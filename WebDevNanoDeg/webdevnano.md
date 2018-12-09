# Table of Contents
- [Efficient Inputs](#efficient-inputs)
  - [Principles of well designed forms](#principles-of-well-designed-forms)
    - [Datalist](#datalist)
  - [Validating inputs with the Validation API](#validating-inputs-with-the-validation-api)
- [Touch Support](#touch-support)
  - [Touch pseudo states](#touch-psuedo-states)


## Efficient Inputs
### Principles of well designed forms
When building forms, the aim is to maximise conversions. e.g. get people to sign up or make a purchase.
- Guides uses through useful labels, validations and progress bars
- Use pre-existing data e.g. postal codes of currently logged in users
- Consider cases where there are much better options than dropdowns
  - provide visual calendars when collecting dates
- Take advantage of HTML5 inputs as they give hints to the device as to which keyboard layout to display e.g. `tel`, `email`, `url` etc.
- Offer suggestions during inputs; you can make use of HTML5 `datalist`
- Leverage browsers builtin validations e.g. `pattern`, `required` and `min-max` attribute for inputs
- Do not force users through registration gates on checkout; give them an option of checking out as guests

Ensure you or your users can answer the following questions when filling forms:
- How long will it take?
- Can I finish the from later?
- Can I finish the form on a different device?

Think of a form as a real world conversation/role playing, with the aim of closing a deal with the person.

Try to collect only the necessary information to limit the time taken for the information needed to be ready. Generally, [***Keep, Cut, Postpone, Explain***](https://www.formisimo.com/blog/4-hours-to-save-your-form/) is a good methodology for determining the type and need for input fields in forms.

#### Datalist
We can give suggestions to users for values for an input field based on what they type:

```html
<label for="my-input">
  <input type="text" name="my-input" value="" list="my-values">
  <datalist id="my-values">
    <option value="value 1"></option>
    <option value="value 2"></option>
    <option value="value 3"></option>
  </datalist>
</label>
```
** *NB:* speed === conversions**

### Validating inputs with the Validation API
Using [`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/setCustomValidity), we can add custom validation to the form input.


### Touch Support
User interfaces should account for touch pseudo-states

#### Touch pseudo states
These include `:hover`, `:focus`, `:active`. Some mobile devices may select text when a user long-presses. While important for copy pasting, it may be frustrating when the user didn't intend to select. We can disable the selection feature as such;

```css
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
```
