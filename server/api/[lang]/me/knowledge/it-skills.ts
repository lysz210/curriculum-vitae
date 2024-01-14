import { serverQueryContent } from '#content/server'
export default defineEventHandler(event => serverQueryContent(event, `/lang/${getRouterParam(event, 'lang')}/me/knowledge/it-skills`)
  .without(["_path","_dir","_draft","_partial","_locale","_id","_type","_source","_file","_extension"])
  .findOne()
  .then(result => {
    return result["body"]
  }))