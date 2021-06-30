<template>
  <div style="display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <section-title style="flex-grow: 1;" title= "Address"></section-title>
      <form novalidate class="flex-input-container" @submit.prevent="updateUser" style="display: flex; flex-wrap: wrap;">
        <md-field :class="getValidationClass('address')" class="input-container" style="width: 300px; margin-right: 20px;">
          <label>Address*</label>
          <md-input v-model="user.address" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.user.address.required">The address is required</span>
          <span class="md-error" v-else-if="!$v.user.address.maxLength">Must contains max. 30 characters</span>
        </md-field>
        <md-field :class="getValidationClass('zip')" class="input-container" style="width: 300px; margin-right: 20px;">
          <label>ZIP code*</label>
          <md-input v-model="user.zip" maxlength="6"></md-input>
          <span class="md-error" v-if="!$v.user.zip.required">The ZIP code is required</span>
          <span class="md-error" v-else-if="!$v.user.zip.numeric">Must contains only numbers</span>
          <span class="md-error" v-else-if="!$v.user.zip.maxLength">Must contains max. 6 characters</span>
        </md-field>
        <md-field :class="getValidationClass('city')" class="input-container" style="width: 300px; margin-right: 20px;">
          <label>City*</label>
          <md-input v-model="user.city" maxlength="30"></md-input>
          <span class="md-error" v-if="!$v.user.city.required">The city code is required</span>
          <span class="md-error" v-else-if="!$v.user.city.maxLength">Must contains max. 6 characters</span>
        </md-field>
        <md-autocomplete v-model="user.country" :md-options="countries" class="input-container" style="width: 300px; margin-right: 20px;">
          <label>Country*</label>
          <span class="md-error" v-if="!$v.user.country.required">The country is required</span>
        </md-autocomplete>
      </form>
    </div>
    <div style="align-self: flex-end;">
        <md-button type="submit" :to="{ name: 'home' }" class="md-raised md-accent btn-login" style="width: 200px;">Close</md-button>
        <md-button type="submit" @click="updateUser" class="md-raised md-primary btn-login" style="width: 200px;">Apply</md-button>
        <FlashMessage></FlashMessage>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'
import SectionTitle from '../template/SectionTitle';

export default {
  name: 'Location',
  components : {
    SectionTitle
  },
  data(){
    return{
      user:'',
      errorMessage:'',
      status:'',
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
      }
    }
  },
  created(){
    this.getUser();
  },
  methods:{
    getUser(){
      API.get('/api/getCurrentUser')
      .then(response => {
        this.user =response.data
      })
      .catch(e => {
      this.errorMessage = e
      })
    },
    updateUser(){
      this.$v.$touch();
      if(this.$v.$error) return
      API.put('/api/user/'+this.user.id,this.user)
      .then(response => {
        this.status =response.data
        this.displayStatus(true)
      })
      .catch(e => {
        this.errorMessage = e
        this.displayStatus(false)
      })
    },
    getValidationClass (fieldName) {
      const field = this.$v.user[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    displayStatus(status){
      if(status){
          this.flashMessage.success({title: 'Success', message: 'User information successfully updated !'});
      }
      else
      {
          this.flashMessage.show({status: 'error', title: 'Error', message: 'An error occured while user information update'})
      }
    },
  }
}
</script>