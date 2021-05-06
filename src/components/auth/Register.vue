<template>
  <div>
    <div class="auth-subtitle">Create an account</div>
    <form novalidate class="md-layout" @submit.prevent="register">

    <md-field :class="getValidationClass('name')">
      <label>First Name*</label>
      <md-input v-model="user.name" maxlength="30"></md-input>
      <span class="md-error" v-if="!$v.user.name.required">The first name is required</span>
      <span class="md-error" v-else-if="!$v.user.name.alpha">Must contains only letters</span>
      <span class="md-error" v-else-if="!$v.user.name.maxLength">Must contains max. 30 characters</span>
    </md-field>

    <md-field :class="getValidationClass('lastname')">
      <label>Last Name*</label>
      <md-input v-model="user.lastname" maxlength="30"></md-input>
      <span class="md-error" v-if="!$v.user.lastname.required">The last name is required</span>
      <span class="md-error" v-else-if="!$v.user.lastname.alpha">Must contains only letters</span>
      <span class="md-error" v-else-if="!$v.user.lastname.maxLength">Must contains max. 30 characters</span>
    </md-field>

    <md-field :class="getValidationClass('address')">
      <label>Address*</label>
      <md-input v-model="user.address" maxlength="30"></md-input>
      <span class="md-error" v-if="!$v.user.address.required">The address is required</span>
      <span class="md-error" v-else-if="!$v.user.address.maxLength">Must contains max. 30 characters</span>
    </md-field>

    <md-field :class="getValidationClass('zip')">
      <label>ZIP code*</label>
      <md-input v-model="user.zip" maxlength="6"></md-input>
      <span class="md-error" v-if="!$v.user.zip.required">The ZIP code is required</span>
      <span class="md-error" v-else-if="!$v.user.zip.numeric">Must contains only numbers</span>
      <span class="md-error" v-else-if="!$v.user.zip.maxLength">Must contains max. 6 characters</span>
    </md-field>

    <md-field :class="getValidationClass('city')">
      <label>City*</label>
      <md-input v-model="user.city" maxlength="30"></md-input>
      <span class="md-error" v-if="!$v.user.city.required">The city code is required</span>
      <span class="md-error" v-else-if="!$v.user.city.maxLength">Must contains max. 6 characters</span>
    </md-field>

    <md-autocomplete v-model="user.country" :md-options="countries">
      <label>Country*</label>
      <span class="md-error" v-if="!$v.user.country.required">The country is required</span>
    </md-autocomplete>

    <md-autocomplete v-model="user.language" :md-options="languages">
      <label>Language*</label>
      <span class="md-error" v-if="!$v.user.language.required">The language is required</span>
    </md-autocomplete>

    <md-field :class="getValidationClass('phone')">
      <label>Phone number*</label>
      <md-input v-model="user.phone" maxlength="30"></md-input>
      <span class="md-error" v-if="!$v.user.phone.required">The phone number is required</span>
    </md-field>

    <md-field :class="getValidationClass('email')">
      <label>E-mail*</label>
      <md-input v-model="user.email"></md-input>
      <span class="md-error" v-if="!$v.user.email.required">The email is required</span>
      <span class="md-error" v-else-if="!$v.user.email.email">Invalid email</span>
    </md-field>
    
    <md-field :class="getValidationClass('password')">
      <label>Password*</label>
      <md-input type="password" name="password" id="password" v-model="user.password" maxlength="30"></md-input>
      <span class="md-error" v-if="!$v.user.password.required">The password is required</span>
      <span class="md-error" v-else-if="!$v.user.password.minLength">Must contain at least 5 characters</span>
    </md-field>
    
    <md-field :class="getValidationClass('cpassword')">
      <label>Confirm password*</label>
      <md-input type="password" name="cpassword" id="cpassword" v-model="user.cpassword" maxlength="30"></md-input>
      <span class="md-error" v-if="!$v.user.cpassword.required">Please confirm your password</span>
      <span class="md-error" v-else-if="!$v.user.cpassword.sameAsPassword">Passwords didn't match. Try again.</span>
    </md-field>

    <md-button class="md-raised md-primary btn-login" type="submit">Create an account</md-button>
    </form>
  </div>
</template>

<script>
import { alpha, required, sameAs, email, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      user:{
        name: '',
        lastname:'',
        address:'',
        zip:'',
        city:'',
        country:'',
        phone:'',
        language:'',
        email: '',
        password: '',
        cpassword:''
    },
    languages: [
      "English",
      "Français",
      "Deutsch",
      "Italiano"
    ],
    countries: [
      "Afghanistan",
      "Åland Islands",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia, Plurinational State of",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo, the Democratic Republic of the",
      "Cook Islands",
      "Costa Rica",
      "Côte d'Ivoire",
      "Croatia",
      "Cuba",
      "Curaçao",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands (Malvinas)",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard Island and McDonald Islands",
      "Holy See (Vatican City State)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran, Islamic Republic of",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea, Democratic People's Republic of",
      "Korea, Republic of",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Macedonia, the Former Yugoslav Republic of",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia, Federated States of",
      "Moldova, Republic of",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine, State of",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Réunion",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "Saint Barthélemy",
      "Saint Helena, Ascension and Tristan da Cunha",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin (French part)",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Sint Maarten (Dutch part)",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan, Province of China",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "United States Minor Outlying Islands",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela, Bolivarian Republic of",
      "Viet Nam",
      "Virgin Islands, British",
      "Virgin Islands, U.S.",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe"
      ]
    }
  },
  validations: {
    user:{
      name:{
        required,
        alpha,
        maxLength: maxLength(30)
      },
      lastname:{
        required,
        alpha,
        maxLength: maxLength(30)
      },
      address:{
        required,
        maxLength: maxLength(30)
      },
      zip:{
        required,
        numeric,
        maxLength: maxLength(10)
      },
      city:{
        required,
        maxLength: maxLength(30)
      },
      country:{
        required
      },
      phone:{
        required
      },
      email:{
        required,
        email
      },
      password:{
        required,
        minLength: minLength(5)
      },
      cpassword:{
        sameAsPassword: sameAs('password')
      },
      language:{
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.user[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    register() {
      this.$v.$touch();
      if(this.$v.$error) return
      console.log(this.user);
      this.$store.dispatch('register', this.user)
        .then(response => {
          this.$store.dispatch('retrieveToken', {
          email: this.user.email,
          password: this.user.password,
          })
            .then(response => {
              this.$router.push({ name: 'home' })
            })
        })
    }
  }
}
</script>