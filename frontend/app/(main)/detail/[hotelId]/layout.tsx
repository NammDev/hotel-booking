import React, { ReactNode } from 'react'

export default function DetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className='ListingDetailPage'>
      {/* <ListingImageGallery
        isShowModal={modal === 'PHOTO_TOUR_SCROLLABLE'}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      /> */}

      <div className='container ListingDetailPage__content'>{children}</div>
      {/* OTHER SECTION */}
      {/* <div className='container py-24 lg:py-32'>
        <div className='relative py-16'>
          <BackgroundSection />
          <SectionSliderNewCategories
            heading='Explore by types of stays'
            subHeading='Explore houses based on 10 types of stays'
            categoryCardType='card5'
            itemPerRow={5}
            sliderStyle='style2'
          />
        </div>
        <SectionSubscribe2 className='pt-24 lg:pt-32' />
      </div> */}

      {/* STICKY FOOTER MOBILE */}
      {/* <MobileFooterSticky /> */}
    </div>
  )
}
