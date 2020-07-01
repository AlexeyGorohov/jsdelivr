<template>
  <v-app id="app">
    <jsdelivr-provider v-slot="{ data, actions }">
      <v-app>
        <v-app-bar app dark color="blue darken-3">
          <v-toolbar-title> jsdelivr </v-toolbar-title>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            label="Search"
            flat
            solo-inverted
            hide-details
            class="ml-5"
            :value="data.queryString"
            @input="actions.setQueryString"
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
          <v-container>
            <v-data-table
              loading-text="Loading... Please wait"
              :loading="data.loading"
              :headers="header"
              :items="data.items"
              :server-items-length="data.itemsLength"
              @update:page="actions.setPage($event - 1)"
              @update:items-per-page="actions.setPerPage($event)"
            >
              <template #item.owner="{ item: { owner } }">
                <v-avatar>
                  <img
                    v-if="owner && owner.avatar"
                    :src="owner.avatar"
                    :alt="owner.name"
                  />
                  <v-icon v-else dark>mdi-account-circle</v-icon>
                </v-avatar>
              </template>
            </v-data-table>
          </v-container>
        </v-main>
      </v-app>
    </jsdelivr-provider>
  </v-app>
</template>

<script>
import { jsdelivrProvider } from './provider/jsdelivr';
import { fields } from './_index.fields';

export default {
  name: 'App',
  computed: {
    header() {
      return fields;
    },
  },
  components: {
    jsdelivrProvider,
  },
};
</script>
