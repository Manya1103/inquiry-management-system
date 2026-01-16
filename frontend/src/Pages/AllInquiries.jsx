import React, { useEffect, useState } from 'react';
import { getInquiries, updateInquiryStatus } from "../config";
import { MessageCircle, Mail, Globe, Users, Search, ChevronDown, Filter } from 'lucide-react';
import tw from "tailwind-styled-components";

const AllInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInquiries = async () => {
    try {
      const { data } = await getInquiries();
      if (data.success) setInquiries(data.data);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    // Optimistic update
    setInquiries(prev => prev.map(item => 
      item._id === id ? { ...item, status: newStatus } : item
    ));
    try {
      await updateInquiryStatus(id, newStatus);
    } catch (error) {
      fetchInquiries(); // Revert on error
    }
  };

  const filteredInquiries = inquiries.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <HeaderSection>
        <div>
          <Title>Dashboard</Title>
          <Subtitle>Manage your incoming leads.</Subtitle>
        </div>
        <SearchWrapper>
          <SearchIconWrapper>
            <Search size={16} />
          </SearchIconWrapper>
          <SearchInput 
            placeholder="Search by name or contact..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
      </HeaderSection>
      
      <TableWrapper>
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <tr>
                <Th>Source</Th>
                <Th>Client Name</Th>
                <Th>Contact Details</Th>
                <Th>Status</Th>
                <Th className="text-right">Action</Th>
              </tr>
            </Thead>
            <Tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <Tr key={inquiry._id}>
                    <Td>
                      <SourceBadgeWrapper $source={inquiry.source}>
                         <SourceIcon source={inquiry.source} /> {inquiry.source}
                      </SourceBadgeWrapper>
                    </Td>
                    <Td>
                      <div className="font-bold text-gray-800">{inquiry.name}</div>
                    </Td>
                    <Td>
                      <div className="text-gray-500 font-medium font-mono text-xs">{inquiry.contact}</div>
                    </Td>
                    <Td>
                      <StatusBadge $status={inquiry.status}>{inquiry.status}</StatusBadge>
                    </Td>
                    <Td className="text-right">
                      <SelectWrapper>
                        <SelectInput 
                          value={inquiry.status}
                          onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </SelectInput>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                      </SelectWrapper>
                    </Td>
                  </Tr>
                ))
              ) : (
                <EmptyRow searchTerm={searchTerm} />
              )}
            </Tbody>
          </Table>
        </div>
        {!loading && (
            <Footer>
                Showing {filteredInquiries.length} of {inquiries.length} entries
            </Footer>
        )}
      </TableWrapper>
    </PageContainer>
  );
};

// UI Helpers
const SourceIcon = ({ source }) => {
  const icons = { WhatsApp: MessageCircle, Email: Mail, Website: Globe, Referral: Users };
  const Icon = icons[source] || Users;
  return <Icon size={14} />;
};

const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-gray-50">
        <td className="p-4"><div className="h-6 w-20 bg-gray-100 rounded-md"></div></td>
        <td className="p-4"><div className="h-4 w-32 bg-gray-100 rounded"></div></td>
        <td className="p-4"><div className="h-4 w-40 bg-gray-100 rounded"></div></td>
        <td className="p-4"><div className="h-6 w-16 bg-gray-100 rounded-full"></div></td>
        <td className="p-4"><div className="h-8 w-24 bg-gray-100 rounded-md ml-auto"></div></td>
    </tr>
)

const EmptyRow = ({ searchTerm }) => (
  <tr>
    <td colSpan="5" className="py-20 text-center">
        <div className="flex flex-col items-center text-gray-400">
            <Filter size={48} className="mb-4 text-gray-200" />
            <p className="text-lg font-medium text-gray-500">No inquiries found</p>
            {searchTerm && <p className="text-sm">No results matching "{searchTerm}"</p>}
        </div>
    </td>
  </tr>
);

export default AllInquiries;

/* --- Styled Components --- */

const PageContainer = tw.div`
  max-w-7xl mx-auto py-10 px-4 sm:px-6
`;

const HeaderSection = tw.div`
  flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8
`;

const Title = tw.h2`
  text-2xl font-bold text-gray-900 tracking-tight
`;

const Subtitle = tw.p`
  text-gray-500 text-sm mt-1
`;

const SearchWrapper = tw.div`
  relative w-full md:w-72
`;

const SearchIconWrapper = tw.div`
  absolute left-3 top-1/2 -translate-y-1/2 text-gray-400
`;

const SearchInput = tw.input`
  w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm
  focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none
  text-sm transition-all placeholder:text-gray-400
`;

const TableWrapper = tw.div`
  bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden
`;

const Table = tw.table`
  w-full text-left border-collapse
`;

const Thead = tw.thead`
  bg-gray-50/50 border-b border-gray-100
`;

const Tbody = tw.tbody`
  divide-y divide-gray-50
`;

const Th = tw.th`
  p-5 text-xs font-semibold text-gray-500 uppercase tracking-wider
`;

const Tr = tw.tr`
  hover:bg-blue-50/30 transition-colors duration-150 group
`;

const Td = tw.td`
  p-5 text-sm text-gray-600 whitespace-nowrap align-middle
`;

const Footer = tw.div`
    p-4 border-t border-gray-100 text-xs text-gray-400 text-center bg-gray-50/30
`

const SourceBadgeWrapper = tw.div`
  ${(p) => {
    switch(p.$source) {
      case 'WhatsApp': return 'text-green-700 bg-green-50 border-green-100';
      case 'Email': return 'text-blue-700 bg-blue-50 border-blue-100';
      case 'Website': return 'text-purple-700 bg-purple-50 border-purple-100';
      default: return 'text-orange-700 bg-orange-50 border-orange-100';
    }
  }}
  inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border
`;

const StatusBadge = tw.span`
  ${(p) => {
    switch(p.$status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Contacted': return 'bg-amber-100 text-amber-700';
      case 'Closed': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100';
    }
  }}
  px-2.5 py-1 rounded-full text-xs font-bold
`;

const SelectWrapper = tw.div`
  relative w-32 ml-auto
`;

const SelectInput = tw.select`
  appearance-none w-full text-xs font-medium bg-white border border-gray-200 rounded-md py-2 pl-3 pr-8 
  shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
  cursor-pointer outline-none hover:border-gray-300 transition-all text-gray-700
`;