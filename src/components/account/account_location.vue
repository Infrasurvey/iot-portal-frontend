<template>
    <div>
        <sidenav-account></sidenav-account>
        <div class="main-install overview-inst">
            <h1>Location</h1>
            <form action="" class="flex-input-container">
                <div class="input-container">
                    <label for="address">Address</label>
                    <input type="text" name="address" id="address">
                </div>
                <div class="input-container">
                    <label for="building">Building</label>
                    <input type="text" name="building" id="building">
                </div>
                <div class="input-container">
                    <label for="zip">Zip code</label>
                    <input type="text" name="zip" id="zip">
                </div>
                <div class="input-container">
                    <label for="city">City</label>
                    <input type="text" name="city" id="city">
                </div>
                <div class="input-container">
                    <label for="country">Country</label>
                    <input type="text" name="country" id="country">
                </div>
            </form>
            <div>
                <button type="submit" class="apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>

import Sidenav from './account_sidenav'

export default {
    name: 'Location',
    components : {
        'sidenav-account' :Sidenav
    }
}
</script>