'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { useState } from 'react'

const POSTS_PER_PAGE = 5

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex items-center justify-center space-y-2 pb-8 pt-6 md:space-y-5">
      {/* Previous Button */}
      {prevPage ? (
        <button className="rounded px-4 py-2 pt-6" onClick={() => onPageChange(currentPage - 1)}>
          {'<'}
        </button>
      ) : (
        <button className="cursor-auto rounded px-4 py-2 pt-6 disabled:opacity-50" disabled>
          {'<'}
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`rounded px-4 py-2 ${page === currentPage ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      {nextPage ? (
        <button className="rounded-md px-4 py-2" onClick={() => onPageChange(currentPage + 1)}>
          {'>'}
        </button>
      ) : (
        <button className="cursor-auto rounded px-4 py-2 disabled:opacity-50" disabled>
          {'>'}
        </button>
      )}
    </div>
  )
}

export default function Home({ posts }) {
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 상태

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  // 현재 페이지에서 보여줄 게시물 슬라이싱
  const displayedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page) // 페이지 변경
  }
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            모든 게시물 ( {posts.length} )
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {displayedPosts.map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
