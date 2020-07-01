import debounce from 'lodash/debounce';

import searchJsdelivr from '../api/search';

export const jsdelivrProvider = {
  data: () => ({
    DELAY_SEARCH: 500,
    loading: false,
    queryString: '',
    items: [],
    page: 0,
    itemsLength: 0,
    itemsPerPage: 10,
  }),
  created() {
    this.search = debounce(this.search, this.DELAY_SEARCH);
  },
  methods: {
    async search() {
      this.loading = true;

      const { response } = await searchJsdelivr(
        this.queryString,
        this.page,
        this.perPage
      );

      this.items = response.hits;
      this.itemsLength = +response.nbHits;

      this.loading = false;
    },

    async setQueryString(queryString) {
      this.queryString = queryString;

      await this.search();
    },

    async setPage(page) {
      this.page = page;

      await this.search();
    },

    async setPerPage(perPage) {
      this.perPage = perPage;

      await this.search();
    },
  },
  render() {
    const slot = this.$scopedSlots.default({
      data: {
        loading: this.loading,
        queryString: this.queryString,
        items: this.items,
        itemsLength: this.itemsLength,
        itemsPerPage: this.itemsPerPage,
      },
      actions: {
        setPage: this.setPage,
        setPerPage: this.setPerPage,
        setQueryString: this.setQueryString,
      },
    });

    return Array.isArray(slot) ? slot[0] : slot;
  },
};
