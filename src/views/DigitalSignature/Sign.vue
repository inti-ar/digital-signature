<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("app.sign")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="sign-form" ref="form">
        <DigestSwitch v-model="digest" />

        <SignDigest v-if="digest" />
        <SignFile v-else />

        <HashSelector v-model="hash" />

        <INTIButton :disabled="!valid" :text="$t('app.sign')" @click="sign" />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import DigestSwitch from "@/components/DigitalSignature/Utils/DigestSwitch.vue";
import SignFile from "@/components/DigitalSignature/Sign/File.vue";
import SignDigest from "@/components/DigitalSignature/Sign/Digest.vue";
import HashSelector from "@/components/DigitalSignature/Utils/HashSelector.vue";
import INTIButton from "@/components/INTIButton.vue";

export default {
  name: "Sign",

  components: {
    DigestSwitch,
    SignFile,
    SignDigest,
    HashSelector,
    INTIButton,
  },

  computed: {
    digest: {
      get() {
        return this.$store.state.digitalSignature.digest;
      },
      set(value) {
        this.$store.dispatch("setDigest", value);
      },
    },

    hash: {
      get() {
        return this.$store.state.digitalSignature.hash;
      },
      set(hash) {
        this.$store.dispatch("setHash", hash);
      },
    },
  },

  data() {
    return {
      valid: true,
    };
  },

  methods: {
    sign() {
      if (!this.$refs.form.validate()) return;

      if (this.digest) {
        this.$store.dispatch("signDigest");
      } else {
        this.$store.dispatch("signFile");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
