import { useParams, Link } from 'react-router-dom'
import { BookMarked, Download, ShoppingBag, MessageCircle, ArrowLeft, Share2, User, Tag, Calendar, ShieldCheck, FileText } from 'lucide-react'
import { useBook, useBooks } from '../../hooks/useBooks'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import EmptyState from '../../components/shared/EmptyState'
import { getDownloadUrl } from '../../lib/cloudinary'

const TEACHER_WHATSAPP = "917535882405" // Updated number

const BookDetailPage = () => {
  const { id } = useParams()
  const { data: book, isLoading, isError, error } = useBook(id)
  const { data: relatedBooks = [] } = useBooks({ category: book?.category })

  if (isLoading) {
    return (
      <div className="container-main py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <Skeleton className="aspect-book w-full rounded-card" />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !book) {
    return (
      <div className="container-main py-20">
        <EmptyState
          icon={BookMarked}
          title="Book not found"
          description={error?.message || "The book you're looking for doesn't exist or has been removed."}
          action={{ label: 'Back to library', onClick: () => window.location.href = '/books' }}
        />
      </div>
    )
  }

  const orderPhysicalUrl = `https://wa.me/${TEACHER_WHATSAPP}?text=Hello! I am interested in ordering a physical copy of your book: *${book.title}* (₹${book.physicalPrice}). Please guide me on the process.`
  
  const purchasePdfUrl = `https://wa.me/${TEACHER_WHATSAPP}?text=Hello! I want to purchase the PDF version of: *${book.title}* (₹${book.price}).`

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      {/* Top Meta Bar */}
      <div className="border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="container-main flex items-center justify-between">
          <Link to="/books" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors">
            <ArrowLeft size={16} />
            Back to library
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-main py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Cover Art */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <div className="relative aspect-book rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 group">
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-4">
                    <BookMarked size={80} strokeWidth={1} />
                    <span className="text-xs font-bold uppercase tracking-widest">No Cover</span>
                  </div>
                )}
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {book.isDigitalAvailable && (
                    <Badge variant={book.price === 0 ? "brand" : "orange"} className="shadow-lg">
                      {book.price === 0 ? "Free PDF" : `₹${book.price} PDF`}
                    </Badge>
                  )}
                  {book.isPhysicalAvailable && (
                    <Badge variant="gray" className="shadow-lg bg-white text-gray-900 border-none">
                      Physical available
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-10">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="gray" className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-none">
                  {book.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>Published {new Date(book.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {book.title}
              </h1>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                  {book.author.charAt(0)}
                </div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  by <span className="text-gray-900 dark:text-white font-bold">{book.author}</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
                <FileText size={20} className="text-brand-600" />
                About this book
              </h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Action Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100 dark:border-gray-800">
              
              {/* PDF Action */}
              {book.isDigitalAvailable ? (
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold dark:text-white">Digital Version</h4>
                    <p className="text-2xl font-black text-brand-600">{book.price === 0 ? "FREE" : `₹${book.price}`}</p>
                  </div>
                  <p className="text-xs text-gray-500">Instant access to high-quality PDF format. View on any device.</p>
                  
                  {book.price === 0 ? (
                    <a 
                      href={getDownloadUrl(book.pdfUrl)} 
                      download={`${book.title}.pdf`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block"
                    >
                      <Button className="w-full gap-2 h-12" variant="brand">
                        <Download size={18} />
                        Download PDF
                      </Button>
                    </a>
                  ) : (
                    <a href={purchasePdfUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full gap-2 h-12" variant="brand">
                        <ShoppingBag size={18} />
                        Buy PDF Version
                      </Button>
                    </a>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center opacity-60">
                   <ShieldCheck size={32} className="text-gray-300 mb-2" />
                   <p className="text-sm font-bold text-gray-400">Digital version currently unavailable</p>
                </div>
              )}

              {/* Physical Action */}
              {book.isPhysicalAvailable ? (
                <div className="p-6 rounded-2xl bg-orange-50/30 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold dark:text-white">Physical Copy</h4>
                    <p className="text-2xl font-black text-orange-600">₹{book.physicalPrice}</p>
                  </div>
                  <p className="text-xs text-gray-500">Get a high-quality printed edition delivered to your doorstep.</p>
                  <a href={orderPhysicalUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gap-2 h-12 bg-orange-600 hover:bg-orange-700 text-white border-none">
                      <MessageCircle size={18} />
                      Order via WhatsApp
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center opacity-60">
                   <ShieldCheck size={32} className="text-gray-300 mb-2" />
                   <p className="text-sm font-bold text-gray-400">Physical copy currently unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage
