'use client'

import { searchHotels } from '@/api/hotels'
import HotelNotFound from '@/app/(dashboard)/dashboard/hotels/[hotelId]/edit/not-found'
import { ProductCard } from '@/components/cards/product-card'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { PaginationButton } from '@/components/pagers/pagination-button'
import { Shell } from '@/components/shells'
import { HotelCardSkeleton } from '@/components/skeletons/hotel-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { QueryKeys } from '@/config/query-key'
import { useSearchContext } from '@/context/SearchContext'
import { useDebounce } from '@/hooks/use-debounce'
import { cn, toTitleCase, truncate } from '@/lib/utils'
import { Option } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useId, useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardDescription } from '@/components/ui/card'
import { MultiSelect } from '@/components/my-ui/multi-select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { sortOptions } from '@/config/products'
import SearchBar from '@/components/search-bar'

const categories = ['skateboards', 'clothing', 'shoes', 'accessories']

const stores = [
  { id: 4, name: 'Store 4', productCount: 12 },
  { id: 5, name: 'Store 5', productCount: 3 },
  { id: 6, name: 'Store 6', productCount: 7 },
  { id: 7, name: 'Store 7', productCount: 9 },
  { id: 8, name: 'Store 8', productCount: 6 },
  { id: 4, name: 'Store 4', productCount: 12 },
  { id: 5, name: 'Store 5', productCount: 3 },
  { id: 6, name: 'Store 6', productCount: 7 },
  { id: 7, name: 'Store 7', productCount: 9 },
  { id: 8, name: 'Store 8', productCount: 6 },
  { id: 4, name: 'Store 4', productCount: 12 },
  { id: 5, name: 'Store 5', productCount: 3 },
  { id: 6, name: 'Store 6', productCount: 7 },
  { id: 7, name: 'Store 7', productCount: 9 },
  { id: 8, name: 'Store 8', productCount: 6 },
  { id: 4, name: 'Store 4', productCount: 12 },
  { id: 5, name: 'Store 5', productCount: 3 },
  { id: 6, name: 'Store 6', productCount: 7 },
  { id: 7, name: 'Store 7', productCount: 9 },
  { id: 8, name: 'Store 8', productCount: 6 },
  { id: 4, name: 'Store 4', productCount: 12 },
  { id: 5, name: 'Store 5', productCount: 3 },
  { id: 6, name: 'Store 6', productCount: 7 },
  { id: 7, name: 'Store 7', productCount: 9 },
  { id: 8, name: 'Store 8', productCount: 6 },
  { id: 4, name: 'Store 4', productCount: 12 },
  { id: 5, name: 'Store 5', productCount: 3 },
  { id: 6, name: 'Store 6', productCount: 7 },
  { id: 7, name: 'Store 7', productCount: 9 },
  { id: 8, name: 'Store 8', productCount: 6 },
  { id: 4, name: 'Store 4', productCount: 12 },
  { id: 5, name: 'Store 5', productCount: 3 },
  { id: 6, name: 'Store 6', productCount: 7 },
  { id: 7, name: 'Store 7', productCount: 9 },
  { id: 8, name: 'Store 8', productCount: 6 },
]

export default function SearchPage() {
  const search = useSearchContext()
  const storePageCount = 2
  const id = useId()
  const router = useRouter()
  const pathname = usePathname()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
  const [sortOption, setSortOption] = useState<string>('')

  const mockup = useSearchParams()
  const categoriesParam = mockup?.get('categories')
  const active = 'true'
  const store_ids = mockup?.get('store_ids')
  const store_page = mockup?.get('store_page') ?? '1'

  const searchParams = useMemo(
    () => ({
      destination: search.destination,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
      stars: selectedStars,
      types: selectedHotelTypes,
      facilities: selectedFacilities,
      maxPrice: selectedPrice?.toString(),
      sortOption,
    }),
    [search, page, selectedStars, selectedHotelTypes, selectedFacilities, selectedPrice, sortOption]
  )

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // Price filter
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const debouncedPrice = useDebounce(priceRange, 500)

  useEffect(() => {
    const [min, max] = debouncedPrice
    const newQueryString = createQueryString({
      price_range: `${min}-${max}`,
    })

    router.push(`${pathname}?${newQueryString}`, {
      scroll: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice])

  // Category filter
  const [selectedCategories, setSelectedCategories] = useState<Option[] | null>(
    categoriesParam
      ? categoriesParam.split('.').map((c) => ({
          label: toTitleCase(c),
          value: c,
        }))
      : null
  )

  useEffect(() => {
    const newQueryString = createQueryString({
      categories: selectedCategories?.length
        ? // Join categories with a dot to make search params prettier
          selectedCategories.map((c) => c.value).join('.')
        : null,
    })

    router.push(`${pathname}?${newQueryString}`, {
      scroll: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories])

  // Store filter
  const [storeIds, setStoreIds] = useState<number[] | null>(
    store_ids ? store_ids?.split('.').map(Number) : null
  )

  useEffect(() => {
    const newQueryString = createQueryString({
      store_ids: storeIds?.length ? storeIds.join('.') : null,
    })

    router.push(`${pathname}?${newQueryString}`, {
      scroll: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeIds])

  const {
    data: hotelData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.SEARCHHOTEL, searchParams],
    queryFn: () => searchHotels(searchParams),
  })

  if (isFetching) {
    return (
      <Shell>
        <div className='space-y-2'>
          <Skeleton className='h-10 w-28' />
          <Skeleton className='h-4 w-48' />
        </div>
        <div className='flex flex-col space-y-6'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-14' />
            <Skeleton className='h-8 w-20' />
          </div>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, i) => (
              <HotelCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Shell>
    )
  } else if (isError || !hotelData?.data?.length) {
    return <HotelNotFound />
  }

  return (
    <Shell>
      <PageHeader>
        <SearchBar />
      </PageHeader>
      <section className='flex flex-col space-y-6'>
        <div className='flex items-center space-x-2'>
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label='Filter products' size='sm'>
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
              <SheetHeader className='px-1'>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <Separator />
              <div className='flex flex-1 flex-col gap-5 overflow-hidden p-1'>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <Label htmlFor={`active-${id}`}>Active stores</Label>
                    <CardDescription>
                      Only show products from stores that are connected to Stripe
                    </CardDescription>
                  </div>
                  <Switch
                    id={`active-${id}`}
                    checked={active === 'true'}
                    onCheckedChange={(value) =>
                      router.push(
                        `${pathname}?${createQueryString({
                          active: value ? 'true' : 'false',
                        })}`,
                        {
                          scroll: false,
                        }
                      )
                    }
                  />
                </div>
                <Card className='space-y-4 rounded-lg p-3'>
                  <h3 className='text-sm font-medium tracking-wide text-foreground'>
                    Price range ($)
                  </h3>
                  <Slider
                    variant='range'
                    thickness='thin'
                    defaultValue={[0, 500]}
                    max={500}
                    step={1}
                    value={priceRange}
                    onValueChange={(value: typeof priceRange) => setPriceRange(value)}
                  />
                  <div className='flex items-center space-x-4'>
                    <Input
                      type='number'
                      inputMode='numeric'
                      min={0}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setPriceRange([value, priceRange[1]])
                      }}
                    />
                    <span className='text-muted-foreground'>-</span>
                    <Input
                      type='number'
                      inputMode='numeric'
                      min={priceRange[0]}
                      max={500}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setPriceRange([priceRange[0], value])
                      }}
                    />
                  </div>
                </Card>
                {categories?.length ? (
                  <Card className='space-y-4 rounded-lg p-3'>
                    <h3 className='text-sm font-medium tracking-wide text-foreground'>
                      Categories
                    </h3>
                    <MultiSelect
                      placeholder='Select categories'
                      selected={selectedCategories}
                      setSelected={setSelectedCategories}
                      options={categories.map((c) => ({
                        label: toTitleCase(c),
                        value: c,
                      }))}
                    />
                  </Card>
                ) : null}
                {categories?.length ? (
                  <Card className='space-y-4 rounded-lg p-3'>
                    <h3 className='text-sm font-medium tracking-wide text-foreground'>
                      Categories
                    </h3>
                    <MultiSelect
                      placeholder='Select categories'
                      selected={selectedCategories}
                      setSelected={setSelectedCategories}
                      options={categories.map((c) => ({
                        label: toTitleCase(c),
                        value: c,
                      }))}
                    />
                  </Card>
                ) : null}
                {/* {category ? (
                <Card className='space-y-4 rounded-lg p-3'>
                  <h3 className='text-sm font-medium tracking-wide text-foreground'>
                    Subcategories
                  </h3>
                  <MultiSelect
                    placeholder='Select subcategories'
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                    options={subcategories}
                  />
                </Card>
              ) : null} */}
                {stores?.length ? (
                  <Card className='space-y-4 overflow-hidden rounded-lg py-3 pl-3'>
                    <div className='flex gap-2 pr-3'>
                      <h3 className='flex-1 text-sm font-medium tracking-wide text-foreground'>
                        Stores
                      </h3>
                      <div className='flex items-center space-x-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8'
                          onClick={() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) - 1,
                              })}`,
                              {
                                scroll: false,
                              }
                            )
                          }}
                          disabled={Number(store_page) === 1}
                        >
                          <ChevronLeftIcon className='size-4' aria-hidden='true' />
                          <span className='sr-only'>Previous store page</span>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8'
                          onClick={() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) + 1,
                              })}`,
                              {
                                scroll: false,
                              }
                            )
                          }}
                          disabled={Number(store_page) === storePageCount}
                        >
                          <ChevronRightIcon className='size-4' aria-hidden='true' />
                          <span className='sr-only'>Next store page</span>
                        </Button>
                      </div>
                    </div>
                    <ScrollArea className='h-full pb-12'>
                      <div className='space-y-4'>
                        {stores.map((store) => (
                          <div key={store.id} className='flex items-center space-x-2'>
                            <Checkbox
                              id={`${id}-store-${store.id}`}
                              checked={storeIds?.includes(store.id) ?? false}
                              onCheckedChange={(value) => {
                                if (value) {
                                  setStoreIds([...(storeIds ?? []), store.id])
                                } else {
                                  setStoreIds(storeIds?.filter((id) => id !== store.id) ?? null)
                                }
                              }}
                            />
                            <Label
                              htmlFor={`${id}-store-${store.id}`}
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              {`${truncate(store.name, 20)} (${store.productCount})`}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                ) : null}
              </div>
              <div>
                <Separator className='my-4' />
                <SheetFooter>
                  <Button
                    aria-label='Clear filters'
                    size='sm'
                    className='w-full'
                    onClick={() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: 0 - 100,
                          store_ids: null,
                          categories: null,
                          subcategories: null,
                          active: 'true',
                        })}`,
                        {
                          scroll: false,
                        }
                      )
                      setPriceRange([0, 100])
                      setSelectedCategories(null)
                      // setSelectedSubcategories(null)
                      setStoreIds(null)
                    }}
                  >
                    Clear Filters
                  </Button>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label='Sort products' size='sm'>
                Sort
                <ChevronDownIcon className='ml-2 size-4' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-48'>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  className={cn(option.value === sortOption && 'bg-accent font-bold')}
                  onClick={() => {
                    setSortOption(option.value)
                    console.log(option.value)
                  }}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {hotelData.data.map((hotel) => (
            <ProductCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        {hotelData.data.length ? (
          <PaginationButton
            pageCount={hotelData.pagination.pages}
            page={hotelData.pagination.page.toString()}
            onPageChange={(page) => setPage(page)}
          />
        ) : null}
      </section>
    </Shell>
  )
}
