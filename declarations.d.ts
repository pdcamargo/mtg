export interface ImageUris {
  small: string
  normal: string
  large: string
  png: string
  art_crop: string
  border_crop: string
}

export interface Legalities {
  standard: string
  future: string
  historic: string
  gladiator: string
  pioneer: string
  modern: string
  legacy: string
  pauper: string
  vintage: string
  penny: string
  commander: string
  brawl: string
  duel: string
  oldschool: string
  premodern: string
}

export interface Prices {
  usd: string
  usd_foil: string
  eur: string
  eur_foil: string
  tix: string
}

export interface RelatedUris {
  gatherer: string
  tcgplayer_infinite_articles: string
  tcgplayer_infinite_decks: string
  edhrec: string
  mtgtop8: string
}

declare interface ICard {
  id: string
  oracle_id: string
  multiverse_ids: number[]
  mtgo_id: number
  mtgo_foil_id: number
  tcgplayer_id: number
  cardmarket_id: number
  name: string
  lang: string
  released_at: string
  uri: string
  scryfall_uri: string
  layout: string
  highres_image: boolean
  image_status: string
  image_uris: ImageUris
  mana_cost: string
  cmc: number
  type_line: string
  oracle_text: string
  colors: string[]
  color_identity: string[]
  keywords: string[]
  legalities: Legalities
  games: string[]
  reserved: boolean
  foil: boolean
  nonfoil: boolean
  oversized: boolean
  promo: boolean
  reprint: boolean
  variation: boolean
  set: string
  set_name: string
  set_type: string
  set_uri: string
  set_search_uri: string
  scryfall_set_uri: string
  rulings_uri: string
  prints_search_uri: string
  collector_number: string
  digital: boolean
  rarity: string
  flavor_text: string
  card_back_id: string
  artist: string
  artist_ids: string[]
  illustration_id: string
  border_color: string
  frame: string
  full_art: boolean
  textless: boolean
  booster: boolean
  story_spotlight: boolean
  edhrec_rank: number
  prices: Prices
  related_uris: RelatedUris
}

export type XY = {
  x: number
  y: number
}

export type FieldCardPosition = {
  0: XY
  1: XY
  2: XY
  3: XY
}

export type FieldCardDom = {
  selector: string
  position: FieldCardPosition
}

export type FieldCard = {
  dom: FieldCardDom
  card: ICard
  isTapped: boolean
  isFaceDown: boolean
}

export type IPlayer = {
  displayName: string
  playerIndex: number
  playerId: string
  playmatchUrl: string
  sleeveColor: string
  sleeveColorGradient: string
}

export type MatchPlayer = {
  mtg: {
    hand: ICard[]
    grave: ICard[]
    exile: ICard[]
    field: FieldCard[]
    deck: ICard[]
  }
  socket: string
} & IPlayer

export type Match = {
  [playerId: string]: MatchPlayer
}

export type IJoinMatch = {
  playerId: string
  displayName: string
  deckList: string[]
  playmatchUrl?: string
  sleeveColor?: string
  sleeveColorGradient?: string
}

export type IPlayCard = {
  playerId: string
  cardIndex: number
}

export type IDrawCard = {
  playerId: string
  amount: number
}

export type IUpdateCardPosition = {
  playerId: string
  cardIndex: number
  position: FieldCardPosition
}

export type ITapCard = {
  playerId: string
  cardIndex: number
  isTapped: boolean
}

export type IChangeFaceDownCard = {
  playerId: string
  cardIndex: number
  isFaceDown: boolean
}

export type Offset = {
  offsetWidth: number
  offsetHeight: number
}
