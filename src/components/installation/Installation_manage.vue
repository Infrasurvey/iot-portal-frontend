<template>
    <div>
        <div class="main-install overview-inst">
            <h2>Manage Installation</h2>
            
            <div class="manage-form">
                <div>
                    <label for="nameInput">Installation name : </label>
                    <input type="text" name="nameInput" id="nameInput" v-model="installation.name">
                </div>
                <div class="img-container">
                    <label for="">Installation Image</label>
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
                <button type="submit" @click="updateInstallation" class="apply-btn">Apply</button>
            </div>


            <h2>Maintenance</h2>
            <div>
                <p>
                    System installation date : <br>
                    Last human intervention : <br>
                    Next uman intervention : 
                </p>
                <button type="submit">Register new human intervention</button>
            </div>
            <h2>Contacts</h2>
            <vue-good-table
            :columns="columns"
            :rows="users"/>
        </div>
    </div>
</template>

<script>
import API from '../../http-constants'
import PictureInput from 'vue-picture-input'
import FormData from 'form-data'
import { VueGoodTable } from 'vue-good-table';

    export default {
        name: 'installation-manage',
        components : {
            PictureInput,
            VueGoodTable,
        },
        data(){
            return{
                installation :{
                    name: ''
                },
                installationId : this.$route.query.id,
                image_path : 'default_image.png',
                image:'',
                errorMessage : '',
                src : '',
                users : [],
                columns: [
                {
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
                }
            ],
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

                        })
                        .catch(e => {
                            this.errorMessage = e
                        })
                },
                onChanged (image) {
                    if (image) {
                        this.image = this.$refs.pictureInput.file
                    }
                }
            }
        }
</script>