/// <reference types="cheerio" />

declare namespace scraped {
    export interface ScrapeOptions {
        [key: string]: string | ScrapeOptionList | ScrapeOptionElement;
    }

    export interface ScrapeOptionElement {
        selector?: string;
        convert?: (value: any) => any;
        how?: string | ((element: cheerio.Selector) => any);
        attr?: string;
        trim?: boolean;
        closest?: string;
        eq?: number;
        texteq?: number;
    }

    export interface ScrapeOptionList {
        listItem: string;
        data?: ScrapeOptions;
        convert?: (value: any) => any;
    }

    export interface ScrapeResult<T> {
        data: T,
        status: number,
        statusText: string,
        $: cheerio.Cheerio,
        body: string
    }

    export function scrapeHTML<T>(body: cheerio.Root | string, options: ScrapeOptions): T;
}

declare function scraped<T>(url: string | object, opts: scraped.ScrapeOptions): Promise<scraped.ScrapeResult<T>>;

export = scraped;
