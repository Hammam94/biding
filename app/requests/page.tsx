import RequestsButton from '@/components/RequestsButton';
import RouteButton from '@/components/RouteButton';
import { createClient } from '@/utils/supabase/server';

export default async function Requests() {
  const supabase = createClient();
  const { data: requests } = await supabase.from("requests")
                                        .select('id, notes, request_lines (id, product_id, quantity, notes)');

  return (
    <>
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <RouteButton path='/newRequest' buttonName='New Request'/>
          </div>
        </nav>
      </div>

      {
        requests &&
        requests.map(request => {
          return (
            <div key={'request-' + request.id} className="mt-6	w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    request # { request.id }
                  </h5>
                  <p>
                    { request.notes }
                  </p>
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {
                    request.request_lines.map(rl => {
                      return (
                        <li className="py-3 sm:py-4" key={'request-line-' + rl.id}>
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                { rl.product_id }
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                { rl.notes }
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              { rl.quantity }
                            </div>
                          </div>
                        </li>
                      );
                    })
                  }             
                </ul>
              </div>
            </div>
          );
        })
      }
    </>
  )
}