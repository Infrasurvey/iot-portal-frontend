<template>
    <div>
        <div class="main-install overview-inst">
            <section-title title= "Manage Installation"></section-title>
            <div class="manage-form">
                <div>
                    <label for="nameInput" class="install-name-label">Installation name : </label>
                    <md-field class="install-name-input">
                        <md-input name="nameInput" id="nameInput" v-model="installation.name"></md-input>
                    </md-field>
                </div>
                <div class="img-container">
                    <label for="">Installation image</label>
                    <div class="img-struct">
                        <div class="image-container">
                        <img :src="src" alt="" width="230px" height="230px">
                        </div>
                        <div class="image-input">
                                <picture-input class="pic-input-i" ref="pictureInput"  :width="230" :removable="true"
                            :height="230" accept="image/jpeg, image/png" size="10" @change="onChanged" removeButtonClass="pic-btn" buttonClass="pic-btn" 
                            :customStrings="{ upload: '<h1>Upload it!</h1>', drag: 'Drag and drop your image here'}">
                            </picture-input>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="apply-container">
                <button type="submit" @click="updateInstallation" class="apply-btn">Update informations</button>
            </div>

            <div class="disabled">
              <section-title title= "Maintenance"></section-title>
              <div>
                  <p>
                      System installation date : <br>
                      Last human intervention : <br>
                      Next uman intervention : 
                  </p>
                  <button type="submit">Register new human intervention</button>
              </div>  
            </div>
            
            <section-title title= "Contacts"></section-title>
            <vue-good-table
            :columns="columns"
            :rows="users"/>
        </div>
        <FlashMessage></FlashMessage>
    </div>
</template>

<script>
import API from '../../http-constants'
import PictureInput from 'vue-picture-input'
import FormData from 'form-data'
import { VueGoodTable } from 'vue-good-table';
import SectionTitle from '../template/SectionTitle';

export default {
  name: 'installation-manage',
  components : {
      PictureInput,
      VueGoodTable,
      SectionTitle
  },
  data(){
    return{
      installation :{
          name: ''
      },
      installationId : this.$route.params.id,
      image_path : 'default_image.png',
      image:'',
      errorMessage : '',
      src : '',
      users : [],
      columns: [{
        label: 'First Name',
        field: 'name'
      },
      {
        label: 'Last Name',
        field: 'lastname',
      },
      {
        label: 'Phone Number',
        field: 'phone',
      },
      {
        label:'E-mail',
        field:'email'
      },
      {
        label:'Role',
        field:'role',
        hidden : true
      }],
    }
  },
  watch: {
        async $route(to, from) {
            this.installationId = to.params.id.toString()
          this.getInstallation();
          this.getUsers()
        }
    },
  created() {
      this.getInstallation();
      this.getUsers()
  },
  methods: {
          getInstallation: function () {
              API.get('/api/installation/'+this.installationId)
                  .then(response => {
                      this.installation = response.data
                      this.image_path = this.installation.image_path
                      this.src = 'http://localhost:8080/storage/images/'+this.image_path
                  })
                  .catch(e => {
                      this.errorMessage = e
                  })
              },
          getUsers(){
              API.get('/api/getUsersByInstallation/'+this.installationId)
              .then(response => {
                  this.users =response.data
      })
      .catch(e => {
      this.errorMessage = e
      })
        },
        updateInstallation(){
                var form = new FormData();
                form.append('image', this.image);
                form.append('name',this.installation.name);
                API.post('/api/updateInstallationImage/'+this.installationId,form)
                .then(response => {
                    this.displayStatus(true)
                })
                .catch(e => {
                    this.errorMessage = e
                    this.displayStatus(false)
                })
        },
        onChanged (image) {
            if (image) {
                this.image = this.$refs.pictureInput.file
            }
        },
        displayStatus(success){
            if(success){
                this.flashMessage.success({title: 'Success', message: 'Installation successfully updated'});
            }
            else{
                this.flashMessage.show({status: 'error',title: 'Error', message: 'An error ocured during installation update'});
            }
        },
      }
  }
</script>