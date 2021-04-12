<template>
    <div>
        <sidenav-account></sidenav-account>
        <div class="main-install overview-inst">
            <h1>Personal informations</h1>
            <form action="" class="flex-input-container">
                <div class="input-container">
                    <label for="first-name">First name</label>
                    <input type="text" name="first-name" id="first-name">
                </div>
                <div class="input-container">
                    <label for="last-name">Last name</label>
                    <input type="text" name="last-name" id="last-name">
                </div>
                <div class="input-container">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email">
                </div>
                <div class="input-container">   
                    <label for="phone">Mobile phone number</label>
                    <input type="text" name="phone" id="phone">
                </div>
            </form>
            <div >
                <button type="submit" class="apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from './account_sidenav'

export default {
    name: 'Informations',
    components : {
        'sidenav-account' :Sidenav
    }
}
</script>
